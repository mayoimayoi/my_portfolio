const NodeMailer = require("nodemailer");

module.exports = {
  // メール送信用関数
  sendMail(smtpData, mailData) {
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
    const smtpData = {
      host: "smtp.gmail.com",
      port: "587", // Gmailの場合SSL: 465 / TLS: 587
      secure: false, // true = SSL
      tls: true,
      auth: {
        user: process.env.mailaddress,
        pass: process.env.mailpass,
      },
    };
    const mailData = {
      from: '"お問い合わせ用アドレス" <' + smtpData.auth.user + ">",
      to: process.env.sendaddress,
      subject: "【お問い合わせ】ポートフォリオサイトより",
      text:
        "お名前:" +
        customer_info.name +
        "アドレス:" +
        customer_info.address +
        "アカウント:" +
        customer_info.account +
        "内容:" +
        customer_info.content,
      html:
        "<p>お名前:" +
        customer_info.name +
        "</p><p>アドレス:" +
        customer_info.address +
        "</p><p>アカウント:" +
        customer_info.account +
        "</p><p>内容:" +
        customer_info.content +
        "</p>",
    };

    // メールを送信
    this.sendMail(smtpData, mailData);
    console.log("送信完了");
  },
};
