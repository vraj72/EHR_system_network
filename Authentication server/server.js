var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var cors=require('cors');
app.use(cors());

//HTTPS Connection
// var https = require('https');
// var fs = require('fs');
// const options = {
//     key: fs.readFileSync('certificates/key.pem'),
//     cert: fs.readFileSync('certificates/certificate.crt')
// };

var register=require('./routes/register');
var login = require('./routes/login');
var report = require('./routes/sugar.js');
var profile = require('./routes/profile.js');
var feedback = require('./routes/feedback.js');
var upload = require('./routes/image.js');

app.use('/register',register);
app.use('/login',login);
app.use('/report',report);
app.use('/profile',profile);
app.use('/feedback',feedback);
app.use('/upload',upload);

//Image Viewing Permission
app.use('/images', express.static(__dirname + '/images'));

//Port activation HTTPS
// https.createServer(options, app).listen(8000,function() {
//     console.log("Listening On Port 8000")
//   });

//Port activation HTTP
app.listen(8000,(req,res) =>{
	console.log("Listening to port 8000");
});

module.exports=app;