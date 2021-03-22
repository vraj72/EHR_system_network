import { Contract, Transaction, Context } from 'fabric-contract-api';
import { Patient, PatientReports } from './assets';
export class PatientDetailsContract extends Contract {
    @Transaction()
    public async InitLedger(ctx: Context): Promise<void> {
        const patients: Patient[] = [
            {
                ID: 'patient1',
                PublicKey: 'dede',
                PersonalDetails: {
                    Username: 'winu',
                    Name: 'Winston Sequeira',
                    DOB: 'yolo',
                    Gender: 'Male',
                    Mobile: '45879622878',
                    Address: 'India',
                },
                Reports: {
                    BloodReports: [
                        {
                            ReportID: 'Report1',
                            ReportFormat: 'Image',
                            Content: 'yolo',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        },
                    ],
                    SugarReports: [],
                    ECGReports: [],
                },
            },
            {
                ID: 'patient2',
                PublicKey: 'dede',
                PersonalDetails: {
                    Username: 'winu',
                    Name: 'Winston Sequeira',
                    DOB: 'yolo',
                    Gender: 'Male',
                    Mobile: '45879622878',
                    Address: 'India',
                },
                Reports: {
                    BloodReports: [
                        {
                            ReportID: 'Report4',
                            ReportFormat: 'Image',
                            Content: 'yolo',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        },
                    ],
                    SugarReports: [
                        {
                            ReportID: 'Report5',
                            ReportFormat: 'Image',
                            Content: 'SugarReport',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        },
                    ],
                    ECGReports: [
                        {
                            ReportID: 'Report4',
                            ReportFormat: 'Image',
                            Content: 'ECGREPORT',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        },
                    ],
                },
            },
            {
                ID: 'patient3',
                PublicKey: 'dede',
                PersonalDetails: {
                    Username: 'winu',
                    Name: 'Winston Sequeira',
                    DOB: 'yolo',
                    Gender: 'Male',
                    Mobile: '45879622878',
                    Address: 'India',
                },
                Reports: {
                    BloodReports: [
                        {
                            ReportID: 'Report6',
                            ReportFormat: 'Image',
                            Content: 'yolo',
                            IssuedBy: 'ME',
                            GeneratedTime: 'justnow',
                        },
                    ],
                    SugarReports: [],
                    ECGReports: [],
                },
            },
        ];

        for (const patient of patients) {
            await ctx.stub.putState(patient.ID, Buffer.from(JSON.stringify(patient)));
            console.info(`Patient ${patient.ID} initialized`);
        }
    }
    @Transaction()
    public async CreatePatient(ctx: Context, id: string, publicKey: string, personalDetails: string): Promise<void> {
        let pd = JSON.parse(personalDetails);
        let patient: Patient = {
            ID: id,
            PublicKey: publicKey,
            PersonalDetails: pd,
        };
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
    public async UpdatePatientPersonalDetails(ctx: Context, id: string, personalDetails: string) {
        const patientRecord = await this.ReadPatientRecord(ctx, id);
        const patient: Patient = JSON.parse(patientRecord.toString());
        let pd = JSON.parse(personalDetails);
        patient.PersonalDetails = pd;
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(patient)));
    }
    @Transaction()
    public async CreateReport(ctx: Context, id: string, reportType: string, Report: string) {
        var flag = '';
        const patientRecord = await this.ReadPatientRecord(ctx, id);
        const patient: Patient = JSON.parse(patientRecord.toString());
        switch (reportType) {
            case 'BloodReports': {
                if (typeof patient.Reports === 'undefined') {
                    flag = 'Reports not defined';
                    const Reports: PatientReports = {};
                    const bloodReport = [];
                    bloodReport.push(JSON.parse(Report));
                    Reports.BloodReports = bloodReport;
                    patient.Reports = Reports;
                } else {
                    if (typeof patient.Reports.BloodReports === 'undefined') {
                        flag = 'Blood reprots not defined';
                        const bloodReport = [];
                        bloodReport.push(JSON.parse(Report));
                        patient.Reports.BloodReports = bloodReport;
                    } else {
                        flag = 'Blood reprots  defined';
                        const bloodReport = patient.Reports.BloodReports;
                        bloodReport.push(JSON.parse(Report));
                        patient.Reports.BloodReports = bloodReport;
                    }
                }
                break;
            }

            case 'SugarReports': {
                if (typeof patient.Reports === 'undefined') {
                    const Reports: PatientReports = {};
                    const sugarReport = [];
                    sugarReport.push(JSON.parse(Report));
                    Reports.SugarReports = sugarReport;
                    patient.Reports = Reports;
                } else {
                    if (typeof patient.Reports.SugarReports === 'undefined') {
                        const sugarReport = [];
                        sugarReport.push(JSON.parse(Report));
                        patient.Reports.SugarReports = sugarReport;
                    } else {
                        const sugarReport = patient.Reports.SugarReports;
                        sugarReport.push(JSON.parse(Report));
                        patient.Reports.SugarReports = sugarReport;
                    }
                }
                break;
            }

            case 'ECGReports': {
                if (typeof patient.Reports === 'undefined') {
                    const Reports: PatientReports = {};
                    const ecgReport = [];
                    ecgReport.push(JSON.parse(Report));
                    Reports.ECGReports = ecgReport;
                    patient.Reports = Reports;
                } else {
                    if (typeof patient.Reports.ECGReports === 'undefined') {
                        const ecgReport = [];
                        ecgReport.push(JSON.parse(Report));
                        patient.Reports.ECGReports = ecgReport;
                    } else {
                        const ecgReport = patient.Reports.ECGReports;
                        ecgReport.push(JSON.parse(Report));
                        patient.Reports.ECGReports = ecgReport;
                    }
                }
                break;
            }

            default:
                return 'Error: Report Type not defined or Invalid Report type';
        }
        console.log(flag, patient, patient.Reports.BloodReports);

        await ctx.stub.putState(id, Buffer.from(JSON.stringify(patient)));
        console.log('why this shit aint working');
        console.log(flag, patient, patient.Reports.BloodReports);
    }
    @Transaction(false)
    public async GetReports(ctx: Context, reportType: string, id: string) {
        const patientRecord = await this.ReadPatientRecord(ctx, id);
        var patient: Patient = JSON.parse(patientRecord.toString());
        if (typeof patient.Reports === 'undefined') {
            return 'No Reports Available';
        }
        switch (reportType) {
            case 'BloodReports':
                if (typeof patient.Reports.BloodReports === 'undefined') {
                    return `No reports available in ${reportType} section for this patient`;
                }
                return patient.Reports.BloodReports;
            case 'SugarReports':
                if (typeof patient.Reports.SugarReports === 'undefined') {
                    return `No reports available in ${reportType} section for this patient`;
                }
                return patient.Reports.SugarReports;
            case 'ECGReports':
                if (typeof patient.Reports.SugarReports === 'undefined') {
                    return `No reports available in ${reportType} section for this patient`;
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
    @Transaction(false)
    public async GetPublicKey(ctx: Context, id: string) {
        const patientRecord = await this.ReadPatientRecord(ctx, id);
        var patient: Patient = JSON.parse(patientRecord.toString());
        return patient.PublicKey;
    }
}
