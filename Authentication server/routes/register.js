var express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
var {generateKeyPair} = require('crypto')
var http = require('http');


// MySQL Connection
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ehr'
});
connection.connect(function(err) {
    if (!err) {
        console.log('Connected to MySql!');
    } else {
        console.log('Not connected to MySql.');
    }
});

//Register 
router.post('/', (req, res) =>{

	var name = req.body.name;
	var email = req.body.email;
	var gender = req.body.gender;
    var dob = req.body.dob;
    var phone = req.body.phone;
    var address = req.body.address;
    var pass = req.body.password;

	var saltRounds = 10;
	var flag=0;

	//To check email ID exist
	connection.query("SELECT email FROM profile",function(error,result) {
		if(error){
			// res.sendStatus(400);
			console.log("ID Fetching Error");
		}
		else{
			for(var i=0;i<result.length;i++){
				if(email==result[i].email){
					res.status(400).send({"Error":"Username Exist !!!!"});
					console.log("Username Exist !!!!")
					flag=1;
				}
			}
			if(flag==0){
				//To Fetch Previous ID
				connection.query("SELECT max(id) AS id FROM profile",function(err,result) {
					//Incrementing ID
					const todaysDate = new Date();
					var prev_id = parseInt(result[0].id) +1;
					var date = todaysDate.getDate();
					date = ("0" + date).slice(-2);
					var month = todaysDate.getMonth() +1;
					month = ("0" + month).slice(-2);
					id = todaysDate.getFullYear().toString() + month.toString()+ date.toString() + prev_id.toString().slice(8,11);
				});

				//Hashing Password
				bcrypt.hash(pass,saltRounds,function(err,hash) {
					if(err){
						// res.sendStatus(400);
						console.log("Hashing Error");
					}
					else{
						//Genearting Public and Private Key
						generateKeyPair('rsa', {
							modulusLength: 4096,
							publicKeyEncoding: {
							type: 'spki',
							format: 'pem'
							},
							privateKeyEncoding: {
							type: 'pkcs8',
							format: 'pem',
							cipher: 'aes-256-cbc',
							passphrase: ' '
							}
						},(err, publicKey,privateKey) => {
						if(err){
							// res.sendStatus(400);
							console.log("Key Generation Error");
						}
						else{
								//To Insert A Record
								connection.query("INSERT INTO profile values(?,?,?,?,?,?,?,?,?,?)",[id,email,name,gender,dob,phone,address,hash,publicKey,privateKey],function(error) {
									if (error){
										// res.sendStatus(400);
										console.log(error);
										console.log("Registration Error");
									}
									else {
										var options = {
											host: '134.209.152.226',
											port: 8010,
											path: '/patient/create',
											method: "POST",
											headers: {
												'Content-Type': 'application/json',
											},
										};
										var requ = http.request(options,function(response) {
											var str = ''
											response.on('data', function (chunk) {
												str += chunk;
											});

											response.on('end', function () {
												console.log(str);
												res.status(200).send({"message":"Registered Sucessfully","id":id,"public":publicKey,"private":privateKey});
												console.log("Registered Sucessfully");
											});
										});
										var pd={};
										pd["Username"]=email;
										pd["Name"]=name;
										pd["DOB"] = dob;
										pd["Gender"] = gender;
										pd["Mobile"] = phone;
										pd["Address"] = address;
										publicKey = publicKey.replace(/(\r\n|\n|\r)/gm, "");
										requ.write(JSON.stringify({"ID":id,"PublicKey":publicKey,"PersonalDetails":pd}));
										requ.end();
									}
								});
							}
						})
					}
				});
			}
		}
	});
});

module.exports = router;