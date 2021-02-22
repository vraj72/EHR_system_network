import { Gateway, Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import path from 'path';
//@ts-ignore
import { buildCCPOrg4, buildWallet } from './../../test-application/javascript/AppUtil.js';
//@ts-ignore
import { buildCAClient, registerAndEnrollUser, enrollAdmin } from './../../test-application/javascript/CAUtil.js';
const __dirname = path.resolve();
const mspOrg4 = 'Org4MSP';
const walletPath = path.join(__dirname, 'wallet');
const org4UserId = 'appUser4';
const ccp = buildCCPOrg4();
const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org4.example.com');
const wallet = await buildWallet(Wallets, walletPath);
await enrollAdmin(caClient, wallet, mspOrg4);
await registerAndEnrollUser(caClient, wallet, mspOrg4, org4UserId, 'org4.department2');
const gateway = new Gateway();
await gateway.connect(ccp, {
    wallet,
    identity: org4UserId,
    discovery: { enabled: true, asLocalhost: true }
});
export default gateway;
