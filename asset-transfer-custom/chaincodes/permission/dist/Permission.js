"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionContract = void 0;
const fabric_contract_api_1 = require("fabric-contract-api");
class PermissionContract extends fabric_contract_api_1.Contract {
    async InitLedger(ctx) {
        let permissions = [
            {
                ID: 'perm1',
                P_ID: '123',
                R_ID: [],
                D_ID: '123',
                Timestamp: 'eded',
                StatusOfRequest: 'Allowed',
                Organization: 'OrgA',
                RequestedTime: 'dkded',
            },
            {
                ID: 'perm2',
                P_ID: '123',
                R_ID: [],
                D_ID: '123',
                Timestamp: 'eded',
                StatusOfRequest: 'Allowed',
                Organization: 'OrgA',
                RequestedTime: 'dkded',
            },
            {
                ID: 'perm3',
                P_ID: '123',
                R_ID: [],
                D_ID: '123',
                Timestamp: 'eded',
                StatusOfRequest: 'Allowed',
                Organization: 'OrgA',
                RequestedTime: 'dkded',
            },
        ];
        for (const permission of permissions) {
            await ctx.stub.putState(permission.ID, Buffer.from(JSON.stringify(permission)));
            console.info(`permission ${permission.ID} initialized`);
        }
    }
    async CreatePermission(ctx, id, P_ID, R_ID, D_ID, Timestamp, StatusOfRequest, Organization, RequestedTime) {
        let permission = {
            ID: id,
            P_ID,
            R_ID,
            D_ID,
            Timestamp,
            StatusOfRequest,
            Organization,
            RequestedTime,
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(permission)));
        let newIndex = ctx.stub.createCompositeKey('ID~PatientID', [permission.ID, permission.P_ID]);
        await ctx.stub.putState(newIndex, Buffer.from('\u0000'));
    }
    async ReadPermission(ctx, id) {
        let permission = await ctx.stub.getState(id);
        return permission.toString();
    }
    async ModifyStatusPermission(ctx, id, status) {
        let permission_buffer = await ctx.stub.getState(id);
        let permission = JSON.parse(permission_buffer.toString());
        if (permission.StatusOfRequest === 'Expired') {
            return `Permission with id ${permission.ID} has expired and cannot be modified further`;
        }
        switch (status) {
            case 'Allowed': {
                permission.StatusOfRequest = status;
                break;
            }
            case 'Denied': {
                permission.StatusOfRequest = status;
                break;
            }
            case 'Expired': {
                permission.StatusOfRequest = status;
                break;
            }
            default: {
                return 'Invalid Status';
            }
        }
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(permission)));
    }
    async GetPatientPermissions(ctx, id) {
        const permissions = [];
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            }
            catch (err) {
                console.log(err);
            }
            if (record.P_ID === id) {
                permissions.push(record);
            }
            result = await iterator.next();
        }
        return JSON.stringify(permissions);
    }
}
exports.PermissionContract = PermissionContract;
//# sourceMappingURL=Permission.js.map