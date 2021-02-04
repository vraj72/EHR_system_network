import { Contract, Context } from 'fabric-contract-api';
export declare class PatientDetailsContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreatePatient(ctx: Context, id: string, publicKey: string, personalDetails: string): Promise<void>;
    ReadPatientRecord(ctx: Context, id: string): Promise<string>;
    PatientExists(ctx: Context, id: string): Promise<boolean>;
    UpdatePatientPersonalDetails(ctx: Context, id: string, personalDetails: string): Promise<void>;
    /**
     *
     * @param id - Represents Patient ID
     * @param reportType - The type of report eg: BloodReports, SugarReports, ECGReports
     * @param Report - The whole report itself which is in string format
     * @returns None
     */
    CreateReport(ctx: Context, id: string, reportType: string, Report: string): Promise<string>;
    GetReports(ctx: Context, reportType: string, id: string): Promise<import("./assets").BloodReports[] | 0 | "Error: Report Type not defined">;
    /**
     *
     * @name GetPublicKey
     * @param ctx - Context for invoking this method
     * @param id - Patient ID
     * @returns Patient's Public key
     */
    GetPublicKey(ctx: Context, id: string): Promise<string>;
}
