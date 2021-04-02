import  express  from 'express';
import  mysql from 'mysql';
const router = express.Router();

//MySql Connection
// var mysql = require('mysql')
var con = mysql.createConnection({
    host: 'localhost',
    user: 'viraj',
    password: 'qwerty',
    database: 'ehr',
});
con.connect(function (err) {
    if (err){
	console.log("Not Connected To Mysql!!!");
    }
    console.log('Connected To Mysql !!!');
});



//SMS
const accountSid = 'AC8d3db9fb8e4c814755faccf55e2bab06';
const authToken = 'bbff097f121fa00ec7be84644d9ba6bd';
// const client = require('twilio')(accountSid, authToken);
import twilio from 'twilio'; 
const client = (twilio) (accountSid,authToken);

//OTP Generation
function getRandomInt() {
   const min = Math.ceil(100000);
    const max = Math.floor(999999);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

router.post('/sendOTP',(req,res)=>{
    var usrn = req.body.Doctor_ID;
    console.log("verify called "+usrn);

    con.query('SELECT * FROM Doctor WHERE Doctor_ID= ? ',[usrn],function (error,results){
        if (error) {
            console.log("error");
            res.sendStatus(400);
        } else {
            if (results.length > 0) {
                console.log("number",results[0].Phone_number);
                const otp = getRandomInt();
                
                //SMS sending
                var smsOptions = {
                    from: '+18178359080',       
                    to: '+91' + results[0].Phone_number, 
                    body: 'OTP for decryption is ' + otp + ' and is valid for 5 minutes.', 
                }
                client.messages.create(smsOptions,function(error,message){
                    if(error){
                        console.log("SMS Error");
                        //res.sendStatus(400);
                    }else{
                        console.log("SMS sent:" + message.sid);
                    }
                });

                // Database part
                var dt = new Date(Date.now() + 300000);
                dt = dt.toISOString().slice(0, 19).replace('T', ' ');
                console.log(usrn,otp,dt )
                con.query('INSERT INTO `OTP` (`Doctor_ID`, `otp`, `validtill`, `isUsed`, `reference_id`) VALUES (?,?,?, 0 , 2)', [usrn, otp, dt], function (error, results, fields) {
                    if (error) {
                        console.log("error: otp db ",error);
                        res.sendStatus(400);
                    } else {
                        //console.log("session ",usrn,otp);
                        console.log('Aadhar OTP:', otp);
                        //console.log("sucess otp db ");
                        res.sendStatus(200);
                    }
                });
            } else {
                //console.log("error");
                res.sendStatus(400);
            }
        }
    });
});


router.post('/verifyOTP', (req, res) => {

    var usrn =req.body.Doctor_ID
    var d = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')
    console.log("verify OTP called :"+usrn+"  req body otp: "+req.body.OTP,d);

    con.query('Select validtill , otp , otpid from OTP where isused = 0 and Doctor_ID= ? and validtill > ?', [usrn, d], function (error, results, fields) {
        if (error) {
            console.log("error: otp db ",error)
            res.sendStatus(400)
        } else {
            var n = results.length - 1
            if (results.length > 0 && results[n].otp == req.body.OTP) {
                //console.log(Date.now(),'\n',	results[0].validtill,'\n' , Date.now() < Date(results[0].validtill))
                con.query('UPDATE OTP SET isUsed = "1" WHERE OTP.otpid = ? ', [results[n].otpid], function (error, results2, fields) {
                    if (error) {
                        console.log("error: otp db ",error);
                    } else {
                        console.log("updated");
                        res.sendStatus(200)
                    }
                })
            } else {
		console.log("hello");
                res.sendStatus(400)
            }
        }
    })
})




export default router;
