import  express  from 'express';
import  mysql from 'mysql';
const router = express.Router();
import nodemailer from 'nodemailer';
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'generixteam2019@gmail.com',
      pass: 'Lifeisgud'
    }
  });

  router.post('/',(req,res)=>{
    var mail = req.body.mail;
    var feedback = req.body.feedback;

    var mailOptions = {
        from: 'generixteam2019@gmail.com',
        to: 'generixteam2019@gmail.com',
        subject: 'Feedback',
        html: '<b>User Email ID:</b> '+ mail + '<br><br><b>Feedback:</b> '+ feedback
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            console.log('Email Recieved From User: ' + info.response);
            mailOptions = {
                from: 'generixteam2019@gmail.com',
                to: mail,
                subject: 'Medi Fabric',
                html: '<p>Thank You For Essential Feedback</p> <b>Note:</b>Please do not reply to this email,this is a system generated email.'
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    console.log('Email Sent: ' + info.response);
                    res.sendStatus(200);
                }
            });
        }
    });
});

export default router;