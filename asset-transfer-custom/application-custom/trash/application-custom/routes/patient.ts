import { Router, Request, Response, request } from 'express';
import express from 'express';
import gateway from './../gateway.js';
import Debug from 'debug';
import path from 'path';
import upload from 'express-fileupload';
import fs from 'fs';
const Report = {
    content: fs.readFileSync(path.join('/home/winston/Downloads', 'winston2.jpeg')).toString('base64'),
    report_type: 'image',
};
const debug = Debug('routes:patient');
import { StatusCodeResolver } from './../modules/status-codes/resolver.js';
debug(`Starting debugging of patient module`);

const router: Router = express.Router();
router.use(upload());
const channelName = 'mychannel';
const chaincodeName = 'custom';
const network = await gateway.getNetwork(channelName);
const contract = network.getContract(chaincodeName);
createReport('patient11', 'SugarReports', Report)
    .then((result) => {
        console.log(StatusCodeResolver('EHR - 103'));
    })
    .catch((error: Error) => {
        debug(`Some error in fetching Reports of patient with Patient ID : `);
        debug(`Error : ${error.name}`);
        debug(`Error message : ${error.message}`);
        debug(`Error stack : ${error.stack}`);
        console.log(StatusCodeResolver('EHR - 022'));
    });
async function getPatient(id: string) {
    const patient: Buffer = await contract.evaluateTransaction('ReadPatientRecord', id);
    return JSON.parse(patient.toString());
}
async function createPatient(id: string, public_key: string, PersonalDetails: string) {
    await contract.submitTransaction('CreatePatient', id, public_key, PersonalDetails);
    let patientExists: Buffer = await contract.evaluateTransaction('PatientExists', id);
    return patientExists.toString();
}

async function patientExists(id: string) {
    let patientExists: Buffer = await contract.evaluateTransaction('PatientExists', id);
    return patientExists.toString();
}

async function updatePatient(id: string, personalDetails: string) {
    await contract.submitTransaction('UpdatePatientPersonalDetails', id, personalDetails);
}
router.post('/', (request: Request, response: Response) => {
    debug('\nIn / route which fetches entire patient object');
    let id: string = request.body.ID;
    debug(`Patient ID : ${id}`);
    patientExists(id)
        .then((patientExist) => {
            if (patientExist !== 'true') {
                debug(`Did not find any Patient with Patient ID : ${id}. The fetch Patient's Details operation  cannot be performed`);
                response.send(StatusCodeResolver('EHR - 021'));
            } else {
                getPatient(id)
                    .then((patient) => {
                        debug('Successfully fetched Patients Details');
                        debug(`Patient : ${patient}`);
                        response.send(patient);
                    })
                    .catch((error: Error) => {
                        debug(`Some error while fetching Details of patient with Patient ID : ${id}`);
                        debug(`Error : ${error.name}`);
                        debug(`Error message : ${error.message}`);
                        debug(`Error stack : ${error.stack}`);
                        response.send(StatusCodeResolver('EHR - 022'));
                    });
            }
        })
        .catch((error: Error) => {
            debug(`Encountered Unhandled Error in /patient route`);
            debug(`Error : ${error.name}`);
            debug(`Error message : ${error.message}`);
            debug(`Error stack : ${error.stack}`);
            response.send(StatusCodeResolver('EHR - 081'));
        });
});

router.post('/create', (request: Request, response: Response) => {
    debug(`\nIn /create route which creates new Patient's`);
    let id: string = request.body.ID;
    let public_key: string = request.body.PublicKey;
    let PersonalDetails = request.body.PersonalDetails;
    debug(`Patient ID : ${id}, Public Key : ${public_key}, Personal Details of Patient :${PersonalDetails}`);
    patientExists(id)
        .then((patientExist) => {
            if (patientExist !== 'true') {
                debug(`Did not find any Patient with Patient ID : ${id}. So operation to create a patient can be started`);
                createPatient(id, public_key, JSON.stringify(PersonalDetails))
                    .then((patient) => {
                        debug(`Successfully inserted patient with Patient ID : ${id}`);
                        response.send(StatusCodeResolver('EHR - 102'));
                    })
                    .catch((error: Error) => {
                        debug(`Some error while inserting patient with Patient ID : ${id}`);
                        debug(`Error : ${error.name}`);
                        debug(`Error message : ${error.message}`);
                        debug(`Error stack : ${error.stack}`);
                        response.send(StatusCodeResolver('EHR - 062'));
                    });
            } else {
                debug(`Patient with Patient ID : ${id} already exists and cannot be inserted again`);
                response.send(StatusCodeResolver('EHR - 061'));
            }
        })
        .catch((error: Error) => {
            debug(`Encountered Unhandled Error in /patient/create route`);
            debug(`Error : ${error.name}`);
            debug(`Error message : ${error.message}`);
            debug(`Error stack : ${error.stack}`);
            response.send(StatusCodeResolver('EHR - 081'));
        });
});

router.post('/update', (request: Request, response: Response) => {
    debug("\nIn /update route which updates Patient's Personal Details");
    const id: string = request.body.ID;
    const PersonalDetails = request.body.PersonalDetails;
    debug(`Patient ID : ${id}, Personal Details of Patient :${PersonalDetails}`);
    patientExists(id)
        .then((patientExist) => {
            if (patientExist !== 'true') {
                debug(`Did not find any Patient with Patient ID: ${id}. The Patient's Personal Details update operation cannot be performed`);
                response.send(StatusCodeResolver('EHR - 041'));
            } else {
                updatePatient(id, JSON.stringify(PersonalDetails))
                    .then((updatedPatient) => {
                        debug(`Successfully updated Personal Details of  patient with Patient ID : ${id}`);
                        response.send(StatusCodeResolver('EHR - 101'));
                    })
                    .catch((error: Error) => {
                        debug(`Some error in updating Personal Details of patient with Patient ID : ${id}`);
                        debug(`Error : ${error.name}`);
                        debug(`Error message : ${error.message}`);
                        debug(`Error stack : ${error.stack}`);
                        response.send(StatusCodeResolver('EHR - 022'));
                    });
            }
        })
        .catch((error: Error) => {
            debug(`Encountered Unhandled Error in /patient/update route`);
            debug(`Error : ${error.name}`);
            debug(`Error message : ${error.message}`);
            debug(`Error stack : ${error.stack}`);
            response.send(StatusCodeResolver('EHR - 081'));
        });
});

async function getReports(id: string, reportType: string) {
    let temp = await contract.evaluateTransaction('GetReports', reportType, id);
    let reports = temp.toString();
    try {
        return JSON.parse(temp.toString());
    } catch (error) {
        return reports;
    }
}
router.post('/reports', (request: Request, response: Response) => {
    debug('\nIn /reports route which return all patient reports');
    const id: string = request.body.ID;
    const reportType: string = request.body.ReportType;
    debug(`Patient ID : ${id}, Type of Reports requested: ${reportType}`);
    patientExists(id)
        .then((patientExist) => {
            if (patientExist !== 'true') {
                debug(`Did not find any Patient with Patient ID : ${id}. The Patient's Reports cannot be fetched`);
                response.send(StatusCodeResolver('EHR - 021'));
            } else {
                getReports(id, reportType)
                    .then((result) => {
                        if (Array.from(result).length === 0) {
                            debug('The Returned Array had zero values in it');
                            debug(`Reports of type ${reportType} : ${Array.from(result)}`);
                            response.send(`No reports were found for the type ${reportType} for Patient ID : ${id}`);
                        } else {
                            response.send(result);
                        }
                    })
                    .catch((error: Error) => {
                        debug(`Some error in fetching Reports of patient with Patient ID : ${id}`);
                        debug(`Error : ${error.name}`);
                        debug(`Error message : ${error.message}`);
                        debug(`Error stack : ${error.stack}`);
                        response.send(StatusCodeResolver('EHR - 022'));
                    });
            }
        })
        .catch((error: Error) => {
            debug(`Encountered Unhandled Error in /patient/ route`);
            debug(`Error : ${error.name}`);
            debug(`Error message : ${error.message}`);
            debug(`Error stack : ${error.stack}`);
            response.send(StatusCodeResolver('EHR - 081'));
        });
});

async function createReport(id: string, reportType: string, report: any) {
    let anc = await contract.submitTransaction('CreateReport', id, reportType, JSON.stringify(report));
    return anc.toString();
}
router.post('/reports/create', (request: Request, response: Response) => {
    debug('/n In /patients/reports/create route which is used to add reports to patients object');
    const id: string = request.body.ID;

    const reportType: string = request.body.ReportType;
    const report = request.body.Report;
    /* const content = request.files?.Content
    content.data = content.data.toString('base64')
    const report = {
        ReportID: request.body.ReportID,
        Content: content,
        GeneratedTime: request.body.GeneratedTime,
        IssuedBy: request.body.IssuedBy,
    };  */

    debug(`Patient ID :${id}, Report Type : ${reportType}, Report Object : ${report}`);
    console.log(id, reportType);
    patientExists(id)
        .then((patientExist) => {
            if (patientExist !== 'true') {
                debug(`Did not find any Patient with Patient ID : ${id}. The Patient's Reports cannot be Created`);
                response.send(StatusCodeResolver('EHR - 021'));
            } else {
                createReport(id, reportType, report)
                    .then((result) => {
                        response.send(StatusCodeResolver('EHR - 103'));
                    })
                    .catch((error: Error) => {
                        debug(`Some error in fetching Reports of patient with Patient ID : ${id}`);
                        debug(`Error : ${error.name}`);
                        debug(`Error message : ${error.message}`);
                        debug(`Error stack : ${error.stack}`);
                        response.send(StatusCodeResolver('EHR - 022'));
                    });
            }
        })
        .catch((error: Error) => {
            debug(`Encountered Unhandled Error in /patient/ route`);
            debug(`Error : ${error.name}`);
            debug(`Error message : ${error.message}`);
            debug(`Error stack : ${error.stack}`);
            response.send(StatusCodeResolver('EHR - 081'));
        });
});
export default router;
