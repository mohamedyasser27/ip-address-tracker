const axios = require("axios"); //api calls
const express = require("express"); //framework for node
const cors = require("cors"); //allow cross domain communication
const app = express();
app.use(
  cors({
    origin: "*", //allow cors from any domain
  })
);


async function checkInputEmptiness(requestURL) {
  if (requestURL == "") {
    const { data } = await axios(
      `https://api.ipdata.co/?api-key=${process.env.IP_API_KEY}`
    );
    return data.ip;
  }
  return requestURL;
}

function formulateRequestUrl(requestedSiteUrl) {
  const isIp = Number(requestedSiteUrl.split(".").join("")); //check if the requested url is ip or domain
  const siteTypeStr = isNaN(isIp) ? "domain" : "ipAddress";
  return `https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.GEO_API_KEY}&${siteTypeStr}=${requestedSiteUrl}`;
}

function callGeoApi(url, res) {
  axios(url)
    .then(({ data }) => {
      const { isp, location, ip } = data;
      res.send({ location, isp, ip });
    })
    .catch((error) => {
      const { code: statusCode } = error.response.data;
      res.sendStatus(statusCode);
    });
}

app.get("/geolocation",async (req, res) => {
  let { requestedSiteUrl } = req.query;
  requestedSiteUrl =await checkInputEmptiness(requestedSiteUrl);
  let url = formulateRequestUrl(requestedSiteUrl);
  callGeoApi(url, res);
});


app.listen(3002);
