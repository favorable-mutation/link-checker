const Redis = require("ioredis");
const redis = new Redis(process.env.REDIS_URL);
const linkinator = require("linkinator");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;
const statusKey = "checkStatus";
const urlsKey = "checkUrls";

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", (req, res) =>
    redis
      .get(statusKey)
      .then((status) => {
        redis
          .lrange(urlsKey, 0, -1)
          .then((errorUrls) => res.render("pages/index", { status, errorUrls }))
          .catch((error) => res.send(`error: ${error}`));
      })
      .catch((error) => res.send(`error: ${error}`))
  )
  .get("/check", (req, res) => {
    res.sendStatus(200);
    redis.del(statusKey);
    redis.del(urlsKey);
    redis.set(statusKey, "RUNNING");
    linkinator
      .check({
        path: "https://pages.github.ccs.neu.edu/jhemann/21SP-CS4400",
        recurse: true,
      })
      .then(({ passed, links }) => {
        redis.set(statusKey, passed ? "SUCCESS" : "FAILURE");
        links
          .filter(({ state }) => state === "BROKEN")
          .forEach(({ url }) => redis.lpush(urlsKey, url));
      });
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
