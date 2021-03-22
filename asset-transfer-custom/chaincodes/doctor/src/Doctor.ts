import { Contract, Transaction, Context } from 'fabric-contract-api';
import { Doctor } from './assets';

export class DoctorContract extends Contract{
    public async InitLedger(ctx:Context){
        let doctors:Doctor[] = [
            {
                ID:'doctor1',
                Name:'Doctor1',
                Password:'hello',
                OrganizationName:'Org1'
            },
            {
                ID:'doctor2',
                Name:'Doctor2',
                Password:'hello',
                OrganizationName:'Org1'
            },
            {
                ID:'doctor1',
                Name:'Doctor3',
                Password:'hello',
                OrganizationName:'Org2'
            }
        ]
        for (const doctor of doctors){
            await ctx.stub.putState(doctor.ID, Buffer.from(JSON.stringify(doctor)));
            console.info(`Doctor ${doctor.ID} initialized`);
        }
    }

    public async CreateDoctor(ctx:Context,id:string,name:string,password:string,org_name:string){
        let doctor:Doctor = {
            ID:id,
            Name:name,
            Password:password,
            OrganizationName:org_name,
        }
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(doctor)));
    }

    public async ReadDoctorDetails(ctx:Context,id:string){
        let doctor = await ctx.stub.getState(id)
        return doctor.toString()
    }
}