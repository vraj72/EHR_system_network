import  express  from 'express';
import  mysql from 'mysql';
import gateway from './../gateway.js';
import Debug from 'debug';
const debug = Debug('routes:reports');
const channelName = 'mychannel';
const chaincodeName = 'custom';
const network = await gateway.getNetwork(channelName);
const contract = network.getContract(chaincodeName);


const router = express.Router();

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

async function patientExists(id) {
    let patientExists = await contract.evaluateTransaction('PatientExists', id);
    return patientExists.toString();
}

async function getReports(id, reportType) {
    let temp = await contract.evaluateTransaction('GetReports', reportType, id);
    let reports = temp.toString();
    try {
        return JSON.parse(temp.toString());
    }
    catch (error) {
        return reports;
    }
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


router.post('/sugar', (request, response) => {
    debug('\nIn /reports route which return all patient reports');
    const id = request.body.ID;
    const reportType = "SugarReports";
    console.log(`Patient ID : ${id}, Type of Reports requested: ${reportType}`);
    patientExists(id)
        .then((patientExist) => {
        if (patientExist !== 'true') {
            debug(`Did not find any Patient with Patient ID : ${id}. The Patient's Reports cannot be fetched`);
            response.send(StatusCodeResolver('EHR - 021'));
        }
        else {
            getReports(id, reportType)
                .then((result) => {
                if (Array.from(result).length === 0) {
                    debug('The Returned Array had zero values in it');
                    debug(`Reports of type ${reportType} : ${Array.from(result)}`);
                    response.send(`No reports were found for the type ${reportType} for Patient ID : ${id}`);
                }
                else {
                    response.send(result);
                }
            })
                .catch((error) => {
                debug(`Some error in fetching Reports of patient with Patient ID : ${id}`);
                debug(`Error : ${error.name}`);
                debug(`Error message : ${error.message}`);
                debug(`Error stack : ${error.stack}`);
                response.send(StatusCodeResolver('EHR - 022'));
            });
        }
    })
        .catch((error) => {
        debug(`Encountered Unhandled Error in /patient/ route`);
        console.log(`Error : ${error.name}`);
        console.log(`Error message : ${error.message}`);
        debug(`Error stack : ${error.stack}`);
        response.send(StatusCodeResolver('EHR - 081'));
    });
});

router.post('/blood', (request, response) => {
    debug('\nIn /reports route which return all patient reports');
    const id = request.body.ID;
    const reportType = "BloodReports";
    console.log(`Patient ID : ${id}, Type of Reports requested: ${reportType}`);
    patientExists(id)
        .then((patientExist) => {
        if (patientExist !== 'true') {
            debug(`Did not find any Patient with Patient ID : ${id}. The Patient's Reports cannot be fetched`);
            response.send(StatusCodeResolver('EHR - 021'));
        }
        else {
            getReports(id, reportType)
                .then((result) => {
                if (Array.from(result).length === 0) {
                    debug('The Returned Array had zero values in it');
                    debug(`Reports of type ${reportType} : ${Array.from(result)}`);
                    response.send(`No reports were found for the type ${reportType} for Patient ID : ${id}`);
                }
                else {
                    response.send(result);
                }
            })
                .catch((error) => {
                debug(`Some error in fetching Reports of patient with Patient ID : ${id}`);
                debug(`Error : ${error.name}`);
                debug(`Error message : ${error.message}`);
                debug(`Error stack : ${error.stack}`);
                response.send(StatusCodeResolver('EHR - 022'));
            });
        }
    })
        .catch((error) => {
        debug(`Encountered Unhandled Error in /patient/ route`);
        console.log(`Error : ${error.name}`);
        console.log(`Error message : ${error.message}`);
        debug(`Error stack : ${error.stack}`);
        response.send(StatusCodeResolver('EHR - 081'));
    });
});



// No reports were found for the type SugarReports for Patient ID : patient1    

//To List All Sugar Report
router.post('/sugar2', (req, res) =>{

    var id = req.body.id;

    // connection.query("SELECT id,type,lab_name,da_te FROM sugar_report WHERE profile_id=?",[id],function(error,result) {
	// 	if(error){
    //         // res.sendStatus(400);
	// 		console.log("Sugar Report Listing Error");
    //     }
    //     else{
    //             console.log("Sugar Report Listed Successfully");
    //             res.status(200).send({"report":result});
    //     }
    // });
});

//Describe Sugar Report
router.post('/sugar/desc', (req, res) =>{

    var id = req.body.id;

    connection.query("SELECT * FROM (SELECT sugar_report.id,profile_id,email,name,gender,phone,type,da_te,value,result,CONVERT(comment USING utf8) as comment FROM sugar_report,profile WHERE profile.id= sugar_report.profile_id) as test WHERE id=?",[id],function(error,result) {
		if(error){
            // res.sendStatus(400);
			console.log("Sugar Report Description Error");
        }
        else{
                console.log("Sugar Report Description Successfully");
                res.status(200).send({"report":result});
        }
    });
});

export default router;
