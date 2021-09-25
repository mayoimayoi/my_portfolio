const NodeMailer = require("nodemailer");

module.exports = {
  // メール送信用関数
  sendMail(smtpData, mailData) {
    console.log("sendMail内");
    const transporter = NodeMailer.createTransport(smtpData);

    transporter.sendMail(mailData, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
  makeMail(customer_info) {
    console.log("smtpData前");
    const smtpData = {
      host: "smtp.gmail.com",
      port: "465", // Gmailの場合SSL: 465 / TLS: 587
      secure: true, // true = SSL
      auth: {
        user: process.env.mailaddress,
        pass: process.env.mailpass,
      },
    };
    console.log("mailData前");
    const mailData = {
      from: '"お問い合わせ用アドレス" <' + smtpData.auth.user + ">",
      to: process.env.sendaddress,
      subject: "【お問い合わせ】ポートフォリオサイトより",
      text:
        "アドレス:" +
        customer_info.address +
        "アカウント:" +
        customer_info.account +
        "内容:" +
        customer_info.content,
      html:
        "<p>アドレス:" +
        customer_info.address +
        "</p><p>アカウント:" +
        customer_info.account +
        "</p><p>内容:" +
        customer_info.content +
        "</p>",
    };

    // メールを送信
    console.log("this.sendMail前");
    this.sendMail(smtpData, mailData);
    console.log("送信完了");
  },
};
