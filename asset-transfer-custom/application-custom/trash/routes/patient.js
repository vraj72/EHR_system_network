import express from 'express';
import gateway from './../gateway.js';
const router = express.Router();
const channelName = 'mychannel';
const chaincodeName = 'custom';
const network = await gateway.getNetwork(channelName);
const contract = network.getContract(chaincodeName);
async function getPatient(id) {
    const patient = await contract.submitTransaction('ReadPatientRecord', id);
    return patient;
}
async function createPatient(id, public_key, PersonalDetails) {
    await contract.submitTransaction('CreatePatient', id, public_key, PersonalDetails);
    let patientExists = await contract.evaluateTransaction('PatientExists', id);
    return patientExists.toString();
}
router.post('/', (request, response) => {
    let id = request.body.id;
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
router.post('/create', (request, response) => {
    let id = request.body.ID;
    let public_key = request.body.PublicKey;
    let PersonalDetails = request.body.PersonalDetails;
    createPatient(id, public_key, JSON.stringify(PersonalDetails))
        .then((result) => {
        if (result === 'true') {
            response.send('Patient registered successfully');
        }
    })
        .catch((error) => {
        console.log(error.message);
    });
    //response.send('Reached on create patient')
});
router.post('/update', (request, response) => {
    response.send('Reached on create patient');
});
export default router;
