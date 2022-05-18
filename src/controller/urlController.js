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
      return res.status(400).send({status: false, message: "Invalid parameter : 'Please enter Url'" });
    }

    let baseUrl = "http://localhost:3000";

    // longUrl validation

    const { longUrl } = data;
    if (!isValid(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter long url" });
    }

    if (!validUrl.isUri(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: " please enter valid long url" });
    }
    let cahcedUrlData = await GET_ASYNC(`${longUrl}`)
    console.log(cahcedUrlData)
    let urlData = JSON.parse(cahcedUrlData)
    if(cahcedUrlData) {
      return res.status(200).send({ status: true, data: urlData })
    }


    // findOne longURl in DB
    const findUrl = await urlModel.findOne({ longUrl: longUrl })
   

    // urlcode 
    const urlCode = shortid.generate().toLowerCase();
    console.log(urlCode);

    const checkCode = await urlModel.findOne({ urlCode: urlCode });
    if (checkCode) {
      return res
        .status(400)
        .send({ status: false, message: " this url Code already exist" });
    }

    // shortUrl creation
    const shortUrl = baseUrl + "/" + urlCode;

    data["shortUrl"] = shortUrl;
    data["urlCode"] = urlCode;

    // create url document
    const create = await urlModel.create(data);
    await SET_ASYNC(`${longUrl}`, JSON.stringify(create))
    return res.status(201).send({ status: true, data: create });
  }

  catch (error) {
    return res.status(500).send({ status: "error", message: "error.message" });
  }
};



// --------------------------------------GET API--------------------------------------------------------------------------------

const redirectUrl = async (req, res) => {
  try {
    const { urlCode } = req.params;
    let cahcedUrlData = await GET_ASYNC(`${urlCode}`)
    if(cahcedUrlData) {
      return res.status(302).redirect(cahcedUrlData)
    }


    const findUrl = await urlModel.findOne({ urlCode: urlCode });
    if (!findUrl) {
      return res.status(404).send({ status: false, message: "Url not found" });
    }

    // redirecting 
    return res.status(302).redirect(findUrl.longUrl);
  }
  catch (error) {
    res.status(500).send({ status: "error", message: "error.message" });
  }
};

module.exports = { createUrl, redirectUrl };
