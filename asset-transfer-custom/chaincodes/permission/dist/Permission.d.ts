import { Contract, Context } from 'fabric-contract-api';
export declare class PermissionContract extends Contract {
    InitLedger(ctx: Context): Promise<void>;
    CreatePermission(ctx: Context, id: string, P_ID: string, R_ID: string[], D_ID: string, Timestamp: string, StatusOfRequest: any, Organization: string, RequestedTime: string): Promise<void>;
    ReadPermission(ctx: Context, id: string): Promise<any>;
    ModifyStatusPermission(ctx: Context, id: string, status: string): Promise<string>;
    GetPatientPermissions(ctx: Context, id: string): Promise<string>;
}
