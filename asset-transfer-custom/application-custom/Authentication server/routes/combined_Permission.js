import  express  from 'express';
import  mysql from 'mysql';
const router = express.Router();
import {gateway1} from './../gateway.js';
import Debug from 'debug';
const debug = Debug('routes:combined_permission');
const channelName = 'mychannel';
const chaincodeName = 'permission';
const network = await gateway1.getNetwork(channelName);
const contract = network.getContract(chaincodeName);


async function  GetPatientPermissions(id){
    let permissions = await contract.evaluateTransaction('GetPatientPermissions',id)
    return JSON.parse(permissions.toString())
}

async function ReadPermission(id){
    let permission = await contract.evaluateTransaction('ReadPermission',id)
    return JSON.parse(permission.toString())
}

async function CreatePermission(id, P_ID, R_ID, D_ID, Timestamp, StatusOfRequest, Organization, RequestedTime) {
    await contract.submitTransaction('CreatePermission', id,P_ID,R_ID,D_ID,Timestamp,StatusOfRequest,Organization,RequestedTime);

}

async function UpdatePermission(id,status){
    await contract.submitTransaction('ModifyStatusPermission',id,status)
}

// MySQL Connection
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'viraj',
//     password: 'qwerty',
//     database: 'ehr'
// });
// connection.connect(function(err) {
//     if (!err) {
//         console.log('Connected to MySql!');
//     } else {
//         console.log('Not connected to MySql.');
//     }
// });



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



router.post('/getPermissions', (request, response) => {
    debug('\nIn /reports route which return all patient permissions');
    const id = request.body.ID;
    // const reportType = "SugarReports";
    console.log(`Patient ID : ${id}`);

    
        
    GetPatientPermissions(id)
        .then((result) => {
        if (Array.from(result).length === 0) {
            debug('The Returned Array had zero values in it');
            debug(`Reports of type: ${Array.from(result)}`);
            response.send(`No permission requests were found for Patient ID : ${id}`);
        }
        else {
            response.send(result);
        }
    })
        .catch((error) => {
        debug(`Some error in fetching permissions of patient with Patient ID : ${id}`);
        debug(`Error : ${error.name}`);
        debug(`Error message : ${error.message}`);
        debug(`Error stack : ${error.stack}`);
        response.send(StatusCodeResolver('EHR - 022'));
    });
        
   
});



router.post('/permissionResponse', (request, response) => {
    debug('\nIn /reports route permission response which return all patient permissions');
    const id = request.body.ID;
    const r = request.body.response_p;
    // const reportType = "SugarReports";
    console.log(`Permission reponse ID : ${id}`);

    
        
    UpdatePermission(id,r)
        .then((result) => {
        response.send("Request "+r);
        console.log(`Permission reponse ID : ${id} status 200`);

    })
        .catch((error) => {
        debug(`Some error in fetching permissions of patient with Patient ID : ${id}`);
        debug(`Error : ${error.name}`);
        debug(`Error message : ${error.message}`);
        debug(`Error stack : ${error.stack}`);
        response.send(StatusCodeResolver('EHR - 022'));
    });
        
   
});




export default router;
