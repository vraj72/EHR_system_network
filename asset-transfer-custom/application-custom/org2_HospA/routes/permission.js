import express from 'express';
import {gateway1} from './../gateway.js';
const router = express.Router();
const channelName = 'mychannel';
const chaincodeName = 'permission';
const network = await gateway1.getNetwork(channelName);
const contract = network.getContract(chaincodeName);

async function CreatePermission(id, P_ID, R_ID, D_ID, Timestamp, StatusOfRequest, Organization, RequestedTime) {
    await contract.submitTransaction('CreatePermission', id, P_ID, R_ID, D_ID, Timestamp, StatusOfRequest, Organization, RequestedTime);
}

async function ReadPermission(id) {
    let report = await contract.evaluateTransaction('ReadPermission', id);
    return report.toString();
}

router.post('/create', (request, response) => {
    let id = request.body.id
    let P_ID = request.body.pid
    let R_ID = request.body.rid
    let D_ID = request.body.did
    let Timestamp = request.body.time
    let StatusOfRequest = request.body.status
    let Organization = request.body.org
    let RequestedTime = request.body.request
    CreatePermission(id,P_ID,R_ID,D_ID,Timestamp,StatusOfRequest,Organization,RequestedTime)
    .then(() => {
        response.send("Permission Succesfully Inserted")
    })
    .catch((error) => {
        console.log(error)
        response.send("Permission Not Succesfully Inserted")
    }); 
});

router.post('/list', (request, response) => {
    let id = request.body.id
    ReadPermission(id)
    .then((result) => {
        response.send(result)
    })
    .catch((error) => {
        console.log(error)
        response.send("Permission Not Succesfully Listed")
    });

});

export default router;
