import { Contract, Context } from 'fabric-contract-api';
export declare class Reports extends Contract {
    CreateBloodReport(ctx: Context, id: string): Promise<void>;
}
