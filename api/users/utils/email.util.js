const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config({ path: "./config.env" });

module.exports = {
    email_otp: async (email_data) => {
         // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_AUTH_USER,
                pass: process.env.SMTP_AUTH_PASS
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"Cottage Cart" < ' + process.env.SMTP_HOST + ' >', // sender address
            to: email_data.to, // list of receivers
            subject: email_data.subject, // Subject line
            text: email_data.text, // plain text body
            html: email_data.html
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        return info;
    },
};