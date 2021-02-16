import { Gateway, Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import path from 'path';
//@ts-ignore
import { buildCCPOrg5, buildWallet } from './../../test-application/javascript/AppUtil.js';
//@ts-ignore
import { buildCAClient, registerAndEnrollUser, enrollAdmin } from './../../test-application/javascript/CAUtil.js';
const __dirname = path.resolve();   
const mspOrg5 = 'Org5MSP';
const walletPath = path.join(__dirname, 'wallet');
const org5UserId = 'appUser';
const ccp = buildCCPOrg5();
const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org5.example.com');
const wallet = await buildWallet(Wallets, walletPath);
await enrollAdmin(caClient, wallet, mspOrg5);
await registerAndEnrollUser(caClient, wallet, mspOrg5, org5UserId, 'org5.department1');
const gateway = new Gateway();
await gateway.connect(ccp, {
    wallet,
    identity: org5UserId,
    discovery: { enabled: true, asLocalhost: true }
});
export default gateway;
