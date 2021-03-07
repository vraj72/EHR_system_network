import  express  from 'express';
import  mysql from 'mysql';
const router = express.Router();
import gateway from './../gateway.js';
import  bcrypt from 'bcrypt';
import  {generateKeyPair} from 'crypto'
import http from 'http';
import Debug from 'debug';
const debug = Debug('routes:register');
const channelName = 'mychannel';
const chaincodeName = 'custom';
const network = await gateway.getNetwork(channelName);
const contract = network.getContract(chaincodeName);




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

async function getPatient(id) {
    const patient = await contract.evaluateTransaction('ReadPatientRecord', id);
    return JSON.parse(patient.toString());
}
async function createPatient(id, public_key, PersonalDetails) {
    await contract.submitTransaction('CreatePatient', id, public_key, PersonalDetails);
    let patientExists = await contract.evaluateTransaction('PatientExists', id);
    return patientExists.toString();
}
async function patientExists(id) {
    let patientExists = await contract.evaluateTransaction('PatientExists', id);
    return patientExists.toString();
}


function StatusCodeResolver(status_code) {
    switch (status_code) {
        //
        case 'EHR - 001': return { code: status_code, type: 'Error', message: 'Error' };
        case 'EHR - 002': return { code: status_code, type: 'Error', message: 'Error' };
        case 'EHR - 003': return { code: status_code, type: 'Error', message: 'Error' };
        case 'EHR - 004': return { code: status_code, type: 'Error', message: 'Error' };
        case 'EHR - 006': return { code: status_code, type: 'Error', message: 'Error' };
        case 'EHR - 007': return { code: status_code, type: 'Error', message: 'Error' };
        case 'EHR - 008': return { code: status_code, type: 'Error', message: 'Error' };
        case 'EHR - 009': return { code: status_code, type: 'Error', message: 'Error' };
        case 'EHR - 010': return { code: status_code, type: 'Error', message: 'Error' };
        // Read error cases
        case 'EHR - 021': return { code: status_code, type: 'Read Error', message: ' Patient with provided Patient ID does not exist' };
        case 'EHR - 022': return { code: status_code, type: 'Read Error', message: 'Error in fetching Details of Patient\n Try again later' };
        case 'EHR - 041': return { code: status_code, type: 'Update Error', message: ' Update Operation called on a non - existing Patient ID' };
        case 'EHR - 062': return { code: status_code, type: 'Update Error', message: 'Error in updating Patient Personal Details\n Try again later' };
        case 'EHR - 061': return { code: status_code, type: 'Creation Error', message: 'Patient with this ID already exists' };
        case 'EHR - 062': return { code: status_code, type: 'Creation Error', message: 'Error in inserting of Patient\n Try again later' };
        case 'EHR - 081': return { code: status_code, type: 'Unhandled Error', message: 'New type of Error encountered which has not yet been handled' };
        case 'EHR - 101': return { code: status_code, type: 'Update Confirmation', message: 'Patient Profile has been updated successfully' };
        case 'EHR - 102': return { code: status_code, type: 'Insertion Confirmation', message: 'Patient registered successfully' };
        case 'EHR - 103': return { code: status_code, type: 'Insertion Confirmation', message: 'Patient Report inserted successfully' };
        default: return { type: 'Invalid Status Code Error', message: 'Resolver has been invoked with invalid existing code' };
    }
}


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
	var id;

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
										// var options = {
										// 	host: 'localhost',
										// 	port: 8010,
										// 	path: '/patient/create',
										// 	method: "POST",
										// 	headers: {
										// 		'Content-Type': 'application/json',
										// 	},
										// };
										// var requ = http.request(options,function(response) {
										// 	var str = ''
										// 	response.on('data', function (chunk) {
										// 		str += chunk;
										// 	});

										// 	response.on('end', function () {
										// 		console.log(str);
										// 		res.status(200).send({"message":"Registered Sucessfully","id":id,"public":publicKey,"private":privateKey});
										// 		console.log("Registered Sucessfully");
										// 	});
										// });
										// var pd={};
										// pd["Username"]=email;
										// pd["Name"]=name;
										// pd["DOB"] = dob;
										// pd["Gender"] = gender;
										// pd["Mobile"] = phone;
										// pd["Address"] = address;
										// publicKey = publicKey.replace(/(\r\n|\n|\r)/gm, "");
										// requ.write(JSON.stringify({"ID":id,"PublicKey":publicKey,"PersonalDetails":pd}));
										// requ.end();


										var pd={};
										pd["Username"]=email;
										pd["Name"]=name;
										pd["DOB"] = dob;
										pd["Gender"] = gender;
										pd["Mobile"] = phone;
										pd["Address"] = address;
										publicKey = publicKey.replace(/(\r\n|\n|\r)/gm, "");

										debug(`Patient ID : ${id}, Public Key : ${publicKey}, Personal Details of Patient :${pd}`);
										patientExists(id)
											.then((patientExist) => {
											if (patientExist !== 'true') {
												debug(`Did not find any Patient with Patient ID : ${id}. So operation to create a patient can be started`);
												createPatient(id, publicKey, JSON.stringify(pd))
													.then((patient) => {
													debug(`Successfully inserted patient with Patient ID : ${id}`);
													res.send(StatusCodeResolver('EHR - 102'));
												})
													.catch((error) => {
													debug(`Some error while inserting patient with Patient ID : ${id}`);
													debug(`Error : ${error.name}`);
													debug(`Error message : ${error.message}`);
													debug(`Error stack : ${error.stack}`);
													res.send(StatusCodeResolver('EHR - 062'));
												});
											}
											else {
												debug(`Patient with Patient ID : ${id} already exists and cannot be inserted again`);
												res.send(StatusCodeResolver('EHR - 061'));
											}
										})
											.catch((error) => {
											debug(`Encountered Unhandled Error in /patient/create route`);
											debug(`Error : ${error.name}`);
											debug(`Error message : ${error.message}`);
											debug(`Error stack : ${error.stack}`);
											res.send(StatusCodeResolver('EHR - 081'));
										});
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

export default router;