'use strict';
var express = require('express');
var nodeMailer = require("nodemailer");
var router = express.Router();
var visitors = require('../middleware/visitorControllers')
var path = require('path')
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
router.get('/download', function (req, res) {
    res.render('download', { title: 'Téléchargement' });
});
router.get('/download/:file', function (req, res) {

    var options = {
        root: path.join(process.cwd(), 'public','media'),
        dotfiles: 'deny',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
    
      var fileName = req.params.file
      res.sendFile(fileName, options, function (err) {
        if (err) {
          console.log(err)
        } else {
          console.log('Sent:', fileName)
        }
      })

});
router.post('/mail', function (req, res) {
    console.log(req.body)
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
        from: "no-reply@indoc-epm.com",
        to: 'engorongbwabrunel@gmail.com',
        subject: req.body.subject,
        text: "Message de M/Me/Mlle : "+req.body.name+" Email : "+req.body.email+" Contact : "+ req.body.contact+" \r\n\n\n"+req.body.message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    res.send("OK");
});
module.exports = router;
