"use strict";
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const ejs = require("ejs");
const helmet = require("helmet");
const mail = require("./JavaScript/mail");

app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();
app.set("view engine", "ejs");
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: "sameorigin" }));
//お問い合わせ用変数
let customer_info = {
  address: "",
  account: "",
  content: "",
};
let error_part = "";

app.get("/", (req, res) => {
  error_part = "";
  res.render("./index.ejs", { errorpart: error_part });
});

app.post("/sendmail", (req, res) => {
  customer_info.address = req.body.customer_address;
  customer_info.account = req.body.customer_account;
  customer_info.content = req.body.customer_content;
  if (customer_info.address === "" && customer_info.account === "") {
    error_part = "アドレスもしくはアカウントをどちらかを入力してください";
  } else if (customer_info.content.length <= 2) {
    error_part = "文字が短すぎます。最低３文字以上入力してください";
  } else if (customer_info.content.length >= 1000) {
    customer_info.content = "";
    error_part = "文字が長すぎます。1000字以下にしてください";
  } else {
    mail.makeMail(customer_info);
    error_part =
      "お問い合わせありがとうございます。返信が届くまで少々お待ちください。";
  }
  res.render("./index.ejs", { errorpart: error_part });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
