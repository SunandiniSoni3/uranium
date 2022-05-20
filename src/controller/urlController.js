const urlModel = require("../model/urlModel");
const validUrl = require("valid-url");
const shortid = require("shortid");
const redis = require("redis");

const { promisify } = require("util");

//Connect to redis
const redisClient = redis.createClient(
  13421,
  "redis-13421.c264.ap-south-1-1.ec2.cloud.redislabs.com",
  { no_ready_check: true }
);
redisClient.auth("9q3nyOJBkIfPFVE0GIURUBK8Bushc3Gb", function (err) {
  if (err) throw err;
});

redisClient.on("connect", async function () {
  console.log("Connected to Redis..");
});

//Connection setup for redis

const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);

const isValid = (value) => {
  if (typeof value === "undefined" || typeof value === "null") return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

// -------------------------------POST API_------------------------------------------------------------------------------
const createUrl = async (req, res) => {
  try {
    let data = req.body;

    // request body validation
    if (Object.keys(data).length === 0) {
      return res.status(400).send({ status: false, message: "Invalid parameter : 'Please enter Url'" });
    }

    let baseUrl = "http://localhost:3000";

    // longUrl validation

    const { longUrl } = data;
    if (!isValid(longUrl)) {
      return res.status(400).send({ status: false, message: "Please enter long url" });
    }

    // longUrl = longUrl.trim()
    if (!validUrl.isWebUri(longUrl.trim())) {
      return res.status(400).send({ status: false, message: " please enter valid long url" });
    }

    let cachedUrlData = await GET_ASYNC(`${longUrl}`);

    let urlData = JSON.parse(cachedUrlData);
    if (cachedUrlData) {
      return res.status(200).send({ status: true, message: "from cache", data: urlData });
    }

    const checkLongUrl = await urlModel.findOne({longUrl:longUrl}).select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 })
      if(checkLongUrl){
        return res.status(200).send({ status: true,  data: checkLongUrl});
      }
    

    // urlcode
    const urlCode = shortid.generate().toLowerCase();

    const checkCode = await urlModel.findOne({ urlCode: urlCode });
    if (checkCode) {
      return res.status(400).send({ status: false, message: `${urlCode}  url Code already exist` });
    }

    // shortUrl creation
    const shortUrl = baseUrl + "/" + urlCode;
    const checkShortUrl = await urlModel.findOne({ shortUrl: shortUrl });
    if (checkShortUrl) {
      return res.status(400).send({ status: false, message: `${shortUrl}  shorturl  already exist` });
    }

    // adding keys in data
    data["shortUrl"] = shortUrl;
    data["urlCode"] = urlCode;

    // create url document
    await urlModel.create(data);

    const create = await urlModel.findOne(data).select({ longUrl: 1, shortUrl: 1, urlCode: 1, _id: 0 });
    await SET_ASYNC(`${longUrl}`, JSON.stringify(create));
    return res.status(201).send({ status: true, data: create });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

// --------------------------------------GET API--------------------------------------------------------------------------------

const redirectUrl = async (req, res) => {
  try {
    const { urlCode } = req.params;

    //if url is in invalid formate
    if (!shortid.isValid(urlCode)) {
      return res
        .status(400)
        .send({ status: false, message: "Not a valid url code" });
    }

    //checks if url code is in cache memory or not
    let cachedUrlData = await GET_ASYNC(`${urlCode}`);
    if (cachedUrlData) {
      return res.status(302).redirect(JSON.parse(cachedUrlData));
    }

    //checks if url code is in database or not
    const findUrl = await urlModel.findOne({ urlCode: urlCode });
    if (!findUrl) {
      return res.status(404).send({ status: false, message: "Url not found" });
    }

    await SET_ASYNC(`${urlCode}`, JSON.stringify(findUrl.longUrl));

    // redirecting
    return res.status(302).redirect(findUrl.longUrl);
  }
  catch (error) {
    res.status(500).send({ status: "error", message: "error.message" });
  }
};



// ------------------------------------to clear redis database------------------------------------------------

const flushw = (req, res) => {
  redisClient.flushall("ASYNC", (err, data) => {
    if (err)
      console.log(err)
    else if (data)
      console.log("Memory flushed: ", data)
  })
  res.status(200).send({ msg: "redis memery cleared" })
}



module.exports = { createUrl, redirectUrl, flushw };
