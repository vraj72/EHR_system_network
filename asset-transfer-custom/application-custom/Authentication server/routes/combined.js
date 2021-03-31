import  express  from 'express';
import  mysql from 'mysql';
const router = express.Router();
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import  fileUpload from 'express-fileupload';
router.use(fileUpload());

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

  // MySQL Connection
// var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'viraj',
    password: 'qwerty',
    database: 'ehr'
});
connection.connect(function(err) {
    if (!err) {
        console.log('Connected to MySql!');
    } else {
        console.log('Not connected to MySql.');
    }
});

//Login
router.post('/login', (req,res) => {
	var email = req.body.username;
	var pass = req.body.password;

	connection.query("SELECT id,password,email,name,CONVERT(private USING utf8) as private,CONVERT(public USING utf8) as public FROM profile WHERE email=?",[email],function(error,results){
		if(error) {
				console.log("Login Error");
	    		res.sendStatus(400);
		}
		else {
		
			if(results.length>0){	    		
				bcrypt.compare(pass,results[0].password,function(err, resp) {
					if(resp) {
						console.log("Succesfully Logged In");
						// var url= "http://134.209.152.226:8000/images/"+results[0].pic;
					    res.status(200).send({"status":"success","message":"Successfully Logged In","id":results[0].id,"name":results[0].name,"email":results[0].email,"public":results[0].public,"private":results[0].private});
					} else {
					     res.status(400).send({"status":"error","message":"Username or Password Error"});
					}
		    		});
			}
			else{
				res.status(400).send({"status":"error","message":"Username or Password Error"});
			}
		}
	});
});




//profile
router.post('/profile', (req, res) =>{

    var id = req.body.id;

    connection.query("SELECT id,email,name,gender,dob,phone,address FROM profile WHERE id=?",[id],function(error,result) {
		if(error){
            // res.sendStatus(400);
			console.log("Profile Error");
        }
        else{
                console.log("Profile Successfull");
                // var url= "http://134.209.152.226:8000/images/"+result[0].pic;
                res.status(200).send({"profile":result[0]});
        }
    });
});


//image upload
router.post('/upload',(req,res) =>{

    var fname = req.body.id; 
    var pic = req.files.pic;

    path = 'images/'+ fname +'.jpg'
    pic.mv(path, function(err) {
        if (err){
            console.log("Image Upload Error");
            res.sendStatus(400);
        }
        else{
            console.log("File Uploaded");
            res.sendStatus(200);
        }
    });
});

//feedback
  router.post('/feedback',(req,res)=>{
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