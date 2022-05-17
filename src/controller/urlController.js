const urlModel = require("../model/urlModel");
const validUrl = require("valid-url");
const shortid = require("shortid");

const isValid = (value) => {
  if (typeof value === "undefined" || typeof value === "null") return false;
  if (typeof value === "string" && value.trim().length === 0) return false;
  return true;
};

const createUrl = async (req, res) => {
  try {
    let data = req.body;

    if (Object.keys(data).length === 0) {
      return res.status(400).send({
        status: false,
        message: "Invalid parameter : 'Please enter Url'",
      });
    }

    let baseUrl = "http://localhost:3000";

    const { longUrl } = data;
    if (!isValid(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter url" });
    }

    if (!validUrl.isUri(longUrl)) {
      return res
        .status(400)
        .send({ status: false, message: " please enter valid url" });
    }
    const urlCode = shortid.generate();

    const checkCode = await urlModel.findOne({ urlCode: urlCode });
    if (checkCode) {
      return res
        .status(400)
        .send({ status: false, message: " this url Code already exist" });
    }

    const shortUrl = baseUrl + "/" + urlCode;

    data["shortUrl"] = shortUrl;
    data["urlCode"] = urlCode;

    const create = await urlModel.create(data);
    return res.status(201).send({ status: true, data: create });
  } catch (error) {
    return res.status(500).send({ status: "error", message: "error.message" });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { urlCode } = req.params;

    const findUrl = await urlModel.findOne({ urlCode: urlCode });
    if (!findUrl) {
      return res.status(404).send({ status: false, message: "Url not found" });
    }

    return res.status(302).redirect(findUrl.longUrl);
  } catch (error) {
    res.status(500).send({ status: "error", message: "error.message" });
  }
};

module.exports = { createUrl, redirectUrl };
