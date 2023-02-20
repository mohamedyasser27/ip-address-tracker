const express = require("express"); //framework for node
const app = express();
const axios = require("axios"); //api calls
const cors = require("cors"); //allow cross domain communication
require("dotenv").config(); //import env variables

app.use(
  cors({
    origin: "*",
  }) //allow cors from this domain
);

function handleResponse(data, res) {
  res.send(location);
}

function formulateRequestUrl(requestedSiteUrl) {
  
  const isIp = Number(requestedSiteUrl.split(".").join(""));
  const siteTypeStr = isNaN(isIp) ? "domain" : "ipAddress";
  return "http://localhost:3000/" + (requestedSiteUrl || "empty");
  // return `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&${siteTypeStr}=${requestedSiteUrl}`;
}
app.get("/geo", async (req, res) => {
  const { requestedSiteUrl } = req.query;
  let requestUrl = formulateRequestUrl(requestedSiteUrl);
  const { data } = await axios(requestUrl);
  const { isp, location, ip } = data;
  res.send({ location, isp, ip });
});
app.listen(process.env.PORT_NUM);

/**
 * TODO:error handling if backend fails
  .catch((error) => {
  const { code: statusCode } = error.response.data;
  return statusCode;
  });
    res.sendStatus(data);
 */
