const linkinator = require("linkinator");
const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 5000;

express()
  .use(express.static(path.join(__dirname, "public")))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  // .get("/", (req, res) => res.render("pages/index"))
  .get("/", (req, res) => {
    linkinator
      .check({
        path: "https://pages.github.ccs.neu.edu/jhemann/21SP-CS4400",
        recurse: true,
      })
      .then(({ passed }) => res.send(passed));
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));
