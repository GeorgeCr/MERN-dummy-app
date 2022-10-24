const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes/index.js");
const cors = require("cors");
const session = require("express-session");
const mongoose = require("mongoose");
const CONNECTION_URI = require("../constants/index.js");

const sessionConfig = {
  name: "web academy",
  secret: "keyboard cat",
  resave: false,
  rolling: true,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly: true, maxAge: 300000 },
};

const app = express();

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());
app.use(session(sessionConfig));

// app.use(bodyParser.urlencoded());
// app.set("x-powered-by", "me myself");

mongoose
  .connect(CONNECTION_URI)
  .then(() => {
    routes(app);

    app.get("/health", (_req, res) => {
      res.send("OK");
    });

    app.listen(3000, () => {
      console.log("App listenting on port 3000.");
    });
  })
  .catch((err) => {
    console.error("Db connection issue. " + err);
  });

// /auth

// res.redirect("/");

// app.post("/hello-world", (req, res) => {
//   console.log("hitting the server");
//   console.log(req, JSON.stringify(req.headers));
//   //   res.cookie("web-academy", "12345");
//   //   res.set("Set-Cookie", "cookie=vanilla; expires: 10:10:2099");
//   res.cookie("cookie", "vanilla");
//   //   res.set("Content-Type", "text/plain");
//   res.send("<div>Hello world</div>");
// });
