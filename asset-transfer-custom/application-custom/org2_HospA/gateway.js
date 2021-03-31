import { Gateway, Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import path from 'path';
//@ts-ignore
import { buildCCPOrg2, buildWallet } from './../../../test-application/javascript/AppUtil.js';
//@ts-ignore
import { buildCAClient, registerAndEnrollUser, enrollAdmin } from './../../../test-application/javascript/CAUtil.js';
const __dirname = path.resolve();
const mspOrg2 = 'Org2MSP';
const walletPath = path.join(__dirname, 'wallet');
const org2UserId = 'appUser2';
const ccp = buildCCPOrg2();
const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org2.example.com');
const wallet = await buildWallet(Wallets, walletPath);
await enrollAdmin(caClient, wallet, mspOrg2);
await registerAndEnrollUser(caClient, wallet, mspOrg2, org2UserId, 'org2.department1');
const gateway = new Gateway();
await gateway.connect(ccp, {
    wallet,
    identity: org2UserId,
    discovery: { enabled: true, asLocalhost: true }
});

const gateway1 = new Gateway();
await gateway1.connect(ccp, {
    wallet,
    identity: org2UserId,
    discovery: { enabled: true, asLocalhost: true }
});

export {gateway, gateway1};
