const request = require("request");
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  request(
    "https://newsapi.org/v2/top-headlines?category=technology&country=us&pageSize=10&apiKey=5220bc9d4b2b45e29c3cff7c3cdb5988",
    (err, resp, body) => {
      if (err) throw err;
      let payload = JSON.parse(body);
      let topNews = payload.articles;
      const newsObj = topNews.map(news => {
        return {
          title: news.title,
          desc: news.description,
          imgUrl: news.urlToImage,
          url: news.url
        };
      });
      console.log(newsObj);
      res.render("index", { newsObj: newsObj });
    }
  );
});

app.listen(PORT, () => console.log("Sever is running at port 3000....."));
