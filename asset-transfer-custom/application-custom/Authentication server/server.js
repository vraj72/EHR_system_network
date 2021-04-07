import express from 'express'
var app = express();
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

import cors from 'cors';
app.use(cors());
import path from 'path';
const __dirname = path.resolve();

//HTTPS Connection
// var https = require('https');
// var fs = require('fs');
// const options = {
//     key: fs.readFileSync('certificates/key.pem'),
//     cert: fs.readFileSync('certificates/certificate.crt')
// };

// import  register from './routes/register.js';
// import  login from './routes/login.js';
// import report from './routes/sugar.js';
// import profile from './routes/profile.js';
// import feedback from './routes/feedback.js';
// import upload from './routes/image.js';
import combined from './routes/combined.js';
import combined_patient from './routes/combined_Patient.js';
import combined_permission from './routes/combined_Permission.js';
//import sms from './routes/sms.js';

// app.use('/register',register);
// app.use('/login',login);
// app.use('/report',report);
// app.use('/profile',profile);
// app.use('/feedback',feedback);
// app.use('/upload',upload);



app.use('/',combined);
app.use('/',combined_patient);
 app.use('/permission',combined_permission);
// app.use('/sms',sms);

//Image Viewing Permission
// app.use('/images', express.static(__dirname + '/images'));

//Port activation HTTPS
// https.createServer(options, app).listen(8000,function() {
//     console.log("Listening On Port 8000")
//   });

//Port activation HTTP
app.listen(8000,(req,res) =>{
	console.log("Listening to port 8000");
});

// module.exports=app;
