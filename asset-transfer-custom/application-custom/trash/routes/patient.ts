import {Router,Request,Response} from 'express'
import express from 'express'
import gateway from './../gateway.js'

const router:Router = express.Router()
const channelName = 'mychannel'
const chaincodeName = 'custom'
const network = await gateway.getNetwork(channelName);
const contract = network.getContract(chaincodeName);

async function getPatient(id:string){
    const patient:Buffer = await contract.submitTransaction('ReadPatientRecord',id)
    return patient
}
async function createPatient(id:string,public_key:string,PersonalDetails:string){
    await contract.submitTransaction('CreatePatient',id,public_key,PersonalDetails)
    let patientExists:Buffer = await contract.evaluateTransaction('PatientExists',id)
    return patientExists.toString()
}
router.post('/',(request:Request,response:Response)=>{
    let id:string = request.body.id
    getPatient(id).then((result)=>{
        response.send(JSON.parse(result.toString()))
    })
    .catch((error:Error)=>{
        if (error.message.includes('does not exist') === true){
            response.send(`Patient with ID : ${id} does not exist`)
        }
        else{
            response.send('Some error')
        }
    })
    
})

router.post('/create',(request:Request,response:Response)=>{
    let id:string = request.body.ID
    let public_key:string = request.body.PublicKey
    let PersonalDetails:string = request.body.PersonalDetails
    createPatient(id,public_key,JSON.stringify(PersonalDetails))
    .then((result:string)=>{
        if (result === 'true'){
            response.send('Patient registered successfully')
        }
    })
    .catch((error:Error)=>{
        console.log(error.message)
    })
    //response.send('Reached on create patient')
})



router.post('/update',(request:Request,response:Response)=>{
    response.send('Reached on create patient')
})



export default router