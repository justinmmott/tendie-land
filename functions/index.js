const functions = require("firebase-functions");
const querystring = require("querystring");
const fetch = require("node-fetch");
const express = require("express");
const app = express();
const cors = require("cors")({origin: true});
const path = require("path");
const cookies = require("cookie-parser");

app.set("view engine", "pug");

app.use(cors);
app.use(cookies());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

app.get("/", (req, res) => {
  if (!req.cookies.__session) res.redirect("https://tendie.land/login");
  else res.redirect("http://tendie.land/app");
});

app.get("/app", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "app-index.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "app-index.html"));
});

app.get("/authorize_callback", (req, res) => {
//   const state = req.query.state;
  const code = req.query.code;

  const globals = functions.config().rtc;
  const base64encodedData = Buffer.from(globals.id + ":" +
    globals.key).toString("base64");

  const body = querystring.stringify({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: globals.redirect_uri,
  });

  fetch("https://www.reddit.com/api/v1/access_token", {
    method: "post",
    body: body,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic " + base64encodedData,
    },
  })
      .then((r) => r.json())
      .then((data) => {
        res.cookie("token", data.access_token, {
          expires: new Date(new Date().getTime() + data.refresh_token * 1000),
          secure: true,
        })
            .cookie("__session", data.refresh_token, {
              secure: true,
            })
            .redirect("https://tendie.land");
      });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "build", "404.html"));
});

exports.app = functions.https.onRequest(app);
