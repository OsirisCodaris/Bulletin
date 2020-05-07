'use strict';
var express = require('express');
var nodeMailer = require("nodemailer");
var router = express.Router();
var visitors = require('../middleware/visitorControllers')

// mailer config


/* GET home page. */
router.get('/', function (req, res) {
    visitors.Increment()
    res.render('home', { title: 'Bull App' });
});
router.get('/documentation', function (req, res) {
    visitors.Increment()
    res.render('doc', { title: 'Documentation' });
});
router.get('/documentation/:page', function (req, res) {
    res.render("documents/"+req.params.page);
});
router.post('/mail', function (req, res) {

    let transporter = nodeMailer.createTransport({
        host: 'mocha3027.mochahost.com',
        port:  465,
        secure: true,
        auth: {
            // should be replaced with real sender's account
            user: 'no-reply@indoc-epm.com',
            pass: 'BUE_g#Ut$@}^'
        }
    });

    let mailOptions = {
        // should be replaced with real recipient's account
        to: 'engorongbwabrunel@gmail.com',
        subject: req.body.subject,
        body: req.body.message
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.end("ok");
});
module.exports = router;
