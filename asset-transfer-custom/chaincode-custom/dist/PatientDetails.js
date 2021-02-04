"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientDetailsContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
class PatientDetailsContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
        const patients = [
            {
                ID: 'patient1',
                PublicKey: 'dede',
                PersonalDetails: {
                    Username: 'winu',
                    Name: 'Winston Sequeira',
                    Email: 'w@ffjf.com',
                    DOB: 'yolo',
                    Gender: 'Male',
                    Mobile: '45879622878',
                },
                Reports: {
                    BloodReports: [
                        {
                            ReportFormat: 'Image',
                            Content: 'yolo',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        }
                    ],
                    SugarReports: [],
                    ECGReports: []
                }
            },
            {
                ID: 'patient2',
                PublicKey: 'dede',
                PersonalDetails: {
                    Username: 'winu',
                    Name: 'Winston Sequeira',
                    Email: 'w@ffjf.com',
                    DOB: 'yolo',
                    Gender: 'Male',
                    Mobile: '45879622878',
                },
                Reports: {
                    BloodReports: [
                        {
                            ReportFormat: 'Image',
                            Content: 'yolo',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        }
                    ],
                    SugarReports: [
                        {
                            ReportFormat: 'Image',
                            Content: 'SugarReport',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        }
                    ],
                    ECGReports: [
                        {
                            ReportFormat: 'Image',
                            Content: 'ECGREPORT',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        }
                    ]
                }
            },
            {
                ID: 'patient3',
                PublicKey: 'dede',
                PersonalDetails: {
                    Username: 'winu',
                    Name: 'Winston Sequeira',
                    Email: 'w@ffjf.com',
                    DOB: 'yolo',
                    Gender: 'Male',
                    Mobile: '45879622878',
                },
                Reports: {
                    BloodReports: [
                        {
                            ReportFormat: 'Image',
                            Content: 'yolo',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        }
                    ],
                    SugarReports: [],
                    ECGReports: []
                }
            }
        ];
        for (const patient of patients) {
            await ctx.stub.putState(patient.ID, Buffer.from(JSON.stringify(patient)));
            console.info(`Patient ${patient.ID} initialized`);
        }
    }
    async CreatePatient(ctx, id, publicKey, personalDetails) {
        let pd = JSON.parse(personalDetails);
        let patient = {
            ID: id,
            PublicKey: publicKey,
            PersonalDetails: pd,
            Reports: {
                BloodReports: [],
                SugarReports: [],
                ECGReports: []
            }
        };
        await ctx.stub.putState(patient.ID, Buffer.from(JSON.stringify(patient)));
    }
    async ReadPatientRecord(ctx, id) {
        const patientRecord = await ctx.stub.getState(id);
        if (!patientRecord || patientRecord.length === 0) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return patientRecord.toString();
    }
    async PatientExists(ctx, id) {
        const patient = await ctx.stub.getState(id);
        return patient && patient.length > 0;
    }
    async UpdatePatientPersonalDetails(ctx, id, personalDetails) {
        const existPatient = await this.PatientExists(ctx, id);
        if (!existPatient) {
            throw new Error(`Patient with ID : ${id} does not exist`);
        }
        const patientRecord = await this.ReadPatientRecord(ctx, id);
        const patient = JSON.parse(patientRecord.toString());
        let pd = JSON.parse(personalDetails);
        patient.PersonalDetails = pd;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(patient)));
    }
    /**
     *
     * @param id - Represents Patient ID
     * @param reportType - The type of report eg: BloodReports, SugarReports, ECGReports
     * @param Report - The whole report itself which is in string format
     * @returns None
     */
    async CreateReport(ctx, id, reportType, Report) {
        const patientRecord = await this.ReadPatientRecord(ctx, id);
        const patient = JSON.parse(patientRecord.toString());
        switch (reportType) {
            case 'BloodReports':
                const bloodReport = patient.Reports.BloodReports;
                bloodReport.push(JSON.parse(Report));
                patient.Reports.BloodReports = bloodReport;
                break;
            case 'SugarReports':
                const sugarReport = patient.Reports.SugarReports;
                sugarReport.push(JSON.parse(Report));
                patient.Reports.SugarReports = sugarReport;
                break;
            case 'ECGReports':
                const ecgReport = patient.Reports.ECGReports;
                ecgReport.push(JSON.parse(Report));
                patient.Reports.ECGReports = ecgReport;
                break;
            default:
                return 'Error: Report Type not defined';
        }
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(patient)));
    }
    async GetReports(ctx, reportType, id) {
        const existPatient = await this.PatientExists(ctx, id);
        if (!existPatient) {
            throw new Error(`Patient with ID : ${id} does not exist`);
        }
        const patientRecord = await this.ReadPatientRecord(ctx, id);
        switch (reportType) {
            case 'BloodReports':
                var patient = JSON.parse(patientRecord.toString());
                if (patient.Reports.BloodReports.length === 0) {
                    return 0;
                }
                return patient.Reports.BloodReports;
            case 'SugarReports':
                var patient = JSON.parse(patientRecord.toString());
                if (patient.Reports.SugarReports.length === 0) {
                    return 0;
                }
                return patient.Reports.SugarReports;
            case 'ECGReports':
                var patient = JSON.parse(patientRecord.toString());
                if (patient.Reports.ECGReports.length === 0) {
                    return 0;
                }
                return patient.Reports.ECGReports;
            default:
                return 'Error: Report Type not defined';
        }
    }
    /**
     *
     * @name GetPublicKey
     * @param ctx - Context for invoking this method
     * @param id - Patient ID
     * @returns Patient's Public key
     */
    async GetPublicKey(ctx, id) {
        const existPatient = await this.PatientExists(ctx, id);
        if (!existPatient) {
            throw new Error(`Patient with ID : ${id} does not exist`);
        }
        const patientRecord = await this.ReadPatientRecord(ctx, id);
        var patient = JSON.parse(patientRecord.toString());
        return patient.PublicKey;
    }
}
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context]),
    __metadata("design:returntype", Promise)
], PatientDetailsContract.prototype, "InitLedger", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], PatientDetailsContract.prototype, "CreatePatient", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PatientDetailsContract.prototype, "ReadPatientRecord", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PatientDetailsContract.prototype, "PatientExists", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PatientDetailsContract.prototype, "UpdatePatientPersonalDetails", null);
__decorate([
    fabric_contract_api_1.Transaction(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String, String]),
    __metadata("design:returntype", Promise)
], PatientDetailsContract.prototype, "CreateReport", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String, String]),
    __metadata("design:returntype", Promise)
], PatientDetailsContract.prototype, "GetReports", null);
__decorate([
    fabric_contract_api_1.Transaction(false),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [fabric_contract_api_1.Context, String]),
    __metadata("design:returntype", Promise)
], PatientDetailsContract.prototype, "GetPublicKey", null);
exports.PatientDetailsContract = PatientDetailsContract;
//# sourceMappingURL=PatientDetails.js.map