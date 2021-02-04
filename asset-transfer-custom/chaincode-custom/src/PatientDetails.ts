import {Contract,Transaction,Context } from 'fabric-contract-api'
import {Patient} from './assets'
export class PatientDetailsContract extends Contract{
    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const patients: Patient[] = [
            {
                ID: 'patient1',
                PublicKey:'dede',
                PersonalDetails:{
                    Username:'winu',
                    Name:'Winston Sequeira',
                    DOB:'yolo',
                    Gender:'Male',
                    Mobile:'45879622878',
                    Address:'India'

                },
                Reports:{
                    BloodReports:[
                        {
                            ReportFormat:'Image',
                            Content:'yolo',
                            IssuedBy:'ME',
                            GeneratedTime:'justnow',

                        }
                    ],
                    SugarReports:[],
                    ECGReports:[]
                }
            },
            {
                ID: 'patient2',
                PublicKey:'dede',
                PersonalDetails:{
                    Username:'winu',
                    Name:'Winston Sequeira',
                    DOB:'yolo',
                    Gender:'Male',
                    Mobile:'45879622878',
                    Address:'India'

                },
                Reports:{
                    BloodReports:[
                        {
                            ReportFormat:'Image',
                            Content:'yolo',
                            IssuedBy:'ME',
                            GeneratedTime:'justnow',
                        }
                    ],
                    SugarReports:[
                        {
                            ReportFormat:'Image',
                            Content:'SugarReport',
                            IssuedBy:'ME',
                            GeneratedTime:'justnow',
                        }
                    ],
                    ECGReports:[
                        {
                            ReportFormat:'Image',
                            Content:'ECGREPORT',
                            IssuedBy:'ME',
                            GeneratedTime:'justnow',
                        }
                    ]
                }
            },
            {
                ID: 'patient3',
                PublicKey:'dede',
                PersonalDetails:{
                    Username:'winu',
                    Name:'Winston Sequeira',
                    DOB:'yolo',
                    Gender:'Male',
                    Mobile:'45879622878',
                    Address:'India'
                },
                Reports:{
                    BloodReports:[
                        {
                            ReportFormat:'Image',
                            Content:'yolo',
                            IssuedBy:'ME',
                            GeneratedTime:'justnow',
                        }
                    ],
                    SugarReports:[],
                    ECGReports:[]
                }
            }
        ];

        for (const patient of patients) {
            await ctx.stub.putState(patient.ID, Buffer.from(JSON.stringify(patient)));
            console.info(`Patient ${patient.ID} initialized`);
        }
    }
    @Transaction()
    public async CreatePatient(ctx: Context,id:string,publicKey:string,personalDetails:string): Promise<void> {
        let pd = JSON.parse(personalDetails)
        let patient:Patient ={
            ID:id,
            PublicKey:publicKey,
            PersonalDetails:pd,
            Reports:{
                BloodReports:[],
                SugarReports:[],
                ECGReports:[]
            }
        } 
        await ctx.stub.putState(patient.ID, Buffer.from(JSON.stringify(patient)));
    }

    @Transaction(false)
    public async ReadPatientRecord(ctx: Context, id: string): Promise<string> {
        const patientRecord = await ctx.stub.getState(id); 
        if (!patientRecord || patientRecord.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return patientRecord.toString();
    }
    
    @Transaction(false)
    public async PatientExists(ctx: Context, id: string): Promise<boolean> {
        const patient = await ctx.stub.getState(id);
        return patient && patient.length > 0;
    }

    @Transaction()
    public async UpdatePatientPersonalDetails(ctx: Context,id:string,personalDetails:string ){
        const existPatient  = await this.PatientExists(ctx,id)
        if(!existPatient){
            throw new Error(`Patient with ID : ${id} does not exist`)
        }
        const patientRecord = await this.ReadPatientRecord(ctx,id)
        const patient:Patient = JSON.parse(patientRecord.toString())
        let pd = JSON.parse(personalDetails)
        patient.PersonalDetails = pd
        await ctx.stub.putState(id,Buffer.from(JSON.stringify(patient)))

    }



   /**
    *
    * @param id - Represents Patient ID
    * @param reportType - The type of report eg: BloodReports, SugarReports, ECGReports 
    * @param Report - The whole report itself which is in string format 
    * @returns None
    */
    @Transaction()
    public async CreateReport(ctx:Context, id:string,reportType:string,Report:string){
        const patientRecord = await this.ReadPatientRecord(ctx,id)
        const patient:Patient = JSON.parse(patientRecord.toString())
        switch (reportType) {
            case 'BloodReports':
                const bloodReport = patient.Reports.BloodReports 
                bloodReport.push(JSON.parse(Report))
                patient.Reports.BloodReports = bloodReport
                break;
            case 'SugarReports':
                const sugarReport = patient.Reports.SugarReports 
                sugarReport.push(JSON.parse(Report))
                patient.Reports.SugarReports = sugarReport
                break;
            case 'ECGReports':
                const ecgReport = patient.Reports.ECGReports
                ecgReport.push(JSON.parse(Report))
                patient.Reports.ECGReports = ecgReport
                break;
            default:
                return 'Error: Report Type not defined'
        }
        await ctx.stub.putState(id,Buffer.from(JSON.stringify(patient)))

    }
    @Transaction(false)
    public async GetReports(ctx:Context,reportType:string,id:string){
        const existPatient  = await this.PatientExists(ctx,id)
        if(!existPatient){
            throw new Error(`Patient with ID : ${id} does not exist`)
        }
        const patientRecord = await this.ReadPatientRecord(ctx,id)
        switch (reportType) {
            case 'BloodReports':
                var patient:Patient = JSON.parse(patientRecord.toString())
                if (patient.Reports.BloodReports.length === 0){
                    return 0
                }
                return patient.Reports.BloodReports
            case 'SugarReports':
                var patient:Patient = JSON.parse(patientRecord.toString())
                if (patient.Reports.SugarReports.length === 0){
                    return 0
                }
                return patient.Reports.SugarReports
            case 'ECGReports':
                var patient:Patient = JSON.parse(patientRecord.toString())
                if (patient.Reports.ECGReports.length === 0){
                    return 0
                }
                return patient.Reports.ECGReports
            default:
                return 'Error: Report Type not defined'
        }
    }



    /**
     * 
     * @name GetPublicKey
     * @param ctx - Context for invoking this method
     * @param id - Patient ID
     * @returns Patient's Public key
     */
    @Transaction(false)
    public async GetPublicKey(ctx:Context,id:string){
        const existPatient  = await this.PatientExists(ctx,id)
        if(!existPatient){
            throw new Error(`Patient with ID : ${id} does not exist`)
        }
        const patientRecord = await this.ReadPatientRecord(ctx,id)
        var patient:Patient = JSON.parse(patientRecord.toString())
        return patient.PublicKey

    }
}