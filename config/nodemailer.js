const nodemailer = require('nodemailer');
var keys;
try {
    keys = require('./keys');
} catch (e) {
    keys = require('./herokuKeys');
};


var transporter = nodemailer.createTransport({
    service: keys.nodemailer.service,
    auth: {
        user: keys.nodemailer.adminEmailId,
        pass: keys.nodemailer.adminEmailPassword
    }
});




var send = function (email, link, callback) {
    const mailOptions = {
        from: keys.nodemailer.from,
        to: 'bhupenders225@gmail.com',
        subject: 'verification',
        html: `<p>Click this link to verify <a href="${link}">${link}</p>`
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            return callback('error found');
        return callback(false, true, info);
    });
};

module.exports.send = send;