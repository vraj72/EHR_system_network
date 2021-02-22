import { Gateway, Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import path from 'path';
//@ts-ignore
import { buildCCPOrg3, buildWallet } from './../../test-application/javascript/AppUtil.js';
//@ts-ignore
import { buildCAClient, registerAndEnrollUser, enrollAdmin } from './../../test-application/javascript/CAUtil.js';
const __dirname = path.resolve();
const mspOrg3 = 'Org3MSP';
const walletPath = path.join(__dirname, 'wallet');
const org3UserId = 'appUser3';
const ccp = buildCCPOrg3();
const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org3.example.com');
const wallet = await buildWallet(Wallets, walletPath);
await enrollAdmin(caClient, wallet, mspOrg3);
await registerAndEnrollUser(caClient, wallet, mspOrg3, org3UserId, 'org3.department1');
const gateway = new Gateway();
await gateway.connect(ccp, {
    wallet,
    identity: org3UserId,
    discovery: { enabled: true, asLocalhost: true }
});
export default gateway;
