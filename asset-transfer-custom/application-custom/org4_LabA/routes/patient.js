import express from 'express';
import Debug from 'debug';
import path from 'path';
const debug = Debug('routes:patient');
// import { StatusCodeResolver } from './../../modules/status-codes/resolver.js';
// import pkg from './../../modules/status-codes/resolver.js';
// const { StatusCodeResolver } = pkg;
debug(`Starting debugging of patient module`);
import gateway from './../gateway.js';
const router = express.Router();
const channelName = 'mychannel';
const chaincodeName = 'custom';
const network = await gateway.getNetwork(channelName);
const contract = network.getContract(chaincodeName);

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


async function getPatient(id) {
    const patient = await contract.submitTransaction('ReadPatientRecord', id);
    return patient;
}
async function patientExists(id) {
    let patientExists = await contract.evaluateTransaction('PatientExists', id);
    return patientExists.toString();
}
async function createReport(id, reportType, report) {
    let anc = await contract.submitTransaction('CreateReport', id, reportType, JSON.stringify(report));
    return anc.toString();
}

router.post('/getPatientDetails', (request, response) => {
    let id = request.body.id;
    console.log("id: get patientDeatisl" + id+JSON.stringify(request.body));
    getPatient(id).then((result) => {
        response.send(JSON.parse(result.toString()));
    })
        .catch((error) => {
        if (error.message.includes('does not exist') === true) {
            response.send(`Patient with ID : ${id} does not exist`);
        }
        else {
            response.send('Some error');
        }
    });
});

// createReport('patient11', 'SugarReports', Report)
//     .then((result) => {
//     console.log(StatusCodeResolver('EHR - 103'));
// })
//     .catch((error) => {
//     debug(`Some error in fetching Reports of patient with Patient ID : `);
//     debug(`Error : ${error.name}`);
//     debug(`Error message : ${error.message}`);
//     debug(`Error stack : ${error.stack}`);
//     console.log(StatusCodeResolver('EHR - 022'));
// });


router.post('/reports/create_sugar', (request, response) => {
    debug('/n In /patients/reports/create route which is used to add reports to patients object');
    const id = request.body.ID;
    const time = Number(new Date());
    const reportType = 'SugarReports';
    // const report = request.body.Report;
    const report = {
        ReportID:'S'+time,
        Content: {
            type : request.body.type,
            value : request.body.value,
            result : request.body.result,
            comment : request.body.comment
        },
        GeneratedTime: time,
        IssuedBy: request.body.IssuedBy,
    };  
    debug(`Patient ID :${id}, Report Type : ${reportType}, Report Object : ${report}`);
    console.log(id, reportType, report);
    patientExists(id)
        .then((patientExist) => {
        if (patientExist !== 'true') {
            debug(`Did not find any Patient with Patient ID : ${id}. The Patient's Reports cannot be Created`);
            response.send(StatusCodeResolver('EHR - 021'));
        }
        else {
            createReport(id, reportType, report)
                .then((result) => {
                response.send(StatusCodeResolver('EHR - 103'));
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
        debug(`Error : ${error.name}`);
        debug(`Error message : ${error.message}`);
        debug(`Error stack : ${error.stack}`);
        response.send(StatusCodeResolver('EHR - 081'));
    });
});




router.post('/reports/create_blood', (request, response) => {
    debug('/n In /patients/reports/create route which is used to add reports to patients object');
    const id = request.body.ID;
    const d= new Date();
    const time = Number(d);
    const reportType = 'BloodReports';
    // const report = request.body.Report;
    const report = {
        ReportID:'B'+time,
        Content: {
            RBC:request.body.RBC,
            Hemoglobin:request.body.Hemoglobin,
            HCT:request.body.HCT,
            Platelets:request.body.Platelets,
            WBC:request.body.WBC,
            ESR:request.body.ESR,
            comment : request.body.comment
        },
        GeneratedTime: d.toString(),
        IssuedBy: request.body.IssuedBy,
    };  
    var reports = JSON.stringify(report);
    console.log(typeof reports, reports)
    debug(`Patient ID :${id}, Report Type : ${reportType}, Report Object : ${report}`);
    // console.log(id, reportType, reports);
    patientExists(id)
        .then((patientExist) => {
        if (patientExist !== 'true') {
            console.log("not found patient")
            debug(`Did not find any Patient with Patient ID : ${id}. The Patient's Reports cannot be Created`);
            response.send(StatusCodeResolver('EHR - 021'));
        }
        else {
            console.log("found patient")
            createReport(id, reportType, report )
                .then((result) => {
                response.send(StatusCodeResolver('EHR - 103'));
            })
                .catch((error) => {
                    console.log(`Error message : ${error.message}`)
                    console.log(`Error : ${error.name}`)
                debug(`Some error in fetching Reports of patient with Patient ID : ${id}`);
                debug(`Error : ${error.name}`);
                debug(`Error message : ${error.message}`);
                debug(`Error stack : ${error.stack}`);
                response.send(StatusCodeResolver('EHR - 022'));
            });
        }
    })
        .catch((error) => {
            console.log(`Error message : ${error.message}`)
            console.log(`Error : ${error.name}`)
        debug(`Encountered Unhandled Error in /patient/ route`);
        debug(`Error : ${error.name}`);
        debug(`Error message : ${error.message}`);
        debug(`Error stack : ${error.stack}`);
        response.send(StatusCodeResolver('EHR - 081'));
    });
});

export default router;
