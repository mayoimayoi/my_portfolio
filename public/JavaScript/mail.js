// nodemailerの読み込み
const NodeMailer = require("nodemailer");

// メール送信関数
function sendMail(smtpData, mailData) {
  // SMTPサーバの情報をまとめる
  const transporter = NodeMailer.createTransport(smtpData);

  // メール送信
  transporter.sendMail(mailData, function (error, info) {
    if (error) {
      // エラー処理
      console.log(error);
    } else {
      // 送信時処理
      console.log("Email sent: " + info.response);
    }
  });
}

// メイン処理
function main() {
  // SMTP情報を格納（Gmailの場合）
  const smtpData = {
    host: "smtp.gmail.com", // Gmailのサーバ
    port: "465", // Gmailの場合　SSL: 465 / TLS: 587
    secure: true, // true = SSL
    auth: {
      user: "tky529@gmail.com", // メールアドレス（自身のアドレスを指定）
      pass: "Takutaku529!", // パスワード（自身のパスワードを指定）
    },
  };

  // 送信内容を作成
  const mailData = {
    from: '"テストユーザ" <' + smtpData.auth.user + ">", // 送信元名
    to: "htky529@yahoo.co.jp", // 送信先
    subject: "こんにちは", // 件名
    text: "お元気ですか？", // 通常のメール本文
    html: "<b>お元気ですか？</b>", // HTMLメール
  };

  // メールを送信
  sendMail(smtpData, mailData);
  console.log("送信完了");
}

// 実行
main();
