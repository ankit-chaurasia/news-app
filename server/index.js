const express = require("express");
const bodyParser = require("body-parser");
const configs = require('./config.json');
const NewsAPI = require("newsapi");
const newsapi = new NewsAPI(configs.NEWS_API_KEY);
const { headerKeys, headerValues } = require("./constants/res-header");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/api/news", (req, res) => {
  const { country } = req.query;
  newsapi.v2
    .topHeadlines({
      language: "en",
      country,
    })
    .then((response) => {
      console.log(response);
      res.setHeader(headerKeys.contentType, headerValues[headerKeys.contentType].json);
      res.send(JSON.stringify({ response, country }));
    });
});

app.get("/api/news/search", (req, res) => {
  const { search } = req.query;
  newsapi.v2
    .everything({
      q: search,
      sources: "bbc-news,the-verge",
      language: "en",
      sortBy: "relevancy",
    })
    .then((response) => {
      res.setHeader(headerKeys.contentType, headerValues[headerKeys.contentType].json);
      res.send(JSON.stringify(response));
    });
});

app.listen(3001, () => console.log("Express server is running on localhost:3001"));
