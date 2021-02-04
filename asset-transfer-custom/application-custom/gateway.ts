import {Gateway,Wallets} from 'fabric-network'
import FabricCAServices from 'fabric-ca-client'
import path from 'path'
//@ts-ignore
import {buildCCPOrg1, buildWallet} from './../../test-application/javascript/AppUtil.js'
//@ts-ignore
import {buildCAClient, registerAndEnrollUser, enrollAdmin} from './../../test-application/javascript/CAUtil.js'
const __dirname = path.resolve();

const mspOrg1 = 'Org1MSP'
const walletPath = path.join(__dirname, 'wallet')
const org1UserId = 'appUser'

const ccp = buildCCPOrg1();
const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');
const wallet = await buildWallet(Wallets, walletPath)
await enrollAdmin(caClient, wallet, mspOrg1);
await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
const gateway = new Gateway();
await gateway.connect(ccp, {
	wallet,
	identity: org1UserId,
	discovery: { enabled: true, asLocalhost: true } 
});

export default gateway