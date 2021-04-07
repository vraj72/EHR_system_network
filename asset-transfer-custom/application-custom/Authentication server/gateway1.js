import { Gateway, Wallets } from 'fabric-network';
import FabricCAServices from 'fabric-ca-client';
import path from 'path';
import fs from 'fs';
//@ts-ignore
const __dirname = path.resolve();
const mspOrg1 = 'Org1MSP';
const walletPath = path.join(__dirname, 'wallet');
const org1UserId = 'appUser1';
const ccp = buildCCPOrg1();
const caClient = buildCAClient(FabricCAServices, ccp, 'ca.org1.example.com');

function buildCCPOrg1() {
        // load the common connection configuration file
        const ccpPath = path.resolve(__dirname, '..', '..','..', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const fileExists = fs.existsSync(ccpPath);
        if (!fileExists) {
                throw new Error(`no such file or directory: ${ccpPath}`);
        }
        const contents = fs.readFileSync(ccpPath, 'utf8');

        // build a JSON object from the file contents
        const ccp = JSON.parse(contents);

        console.log(`Loaded the network configuration located at ${ccpPath}`);
        return ccp;
};

async function buildCAClient(FabricCAServices, ccp, caHostName) {
        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities[caHostName]; //lookup CA details from config
        const caTLSCACerts = caInfo.tlsCACerts.pem;
        const caClient = new FabricCAServices(caInfo.url, { trustedRoots: caTLSCACerts, verify: false }, caInfo.caName);

        console.log(`Built a CA Client named ${caInfo.caName}`);
        return caClient;
};

async function enrollAdmin(caClient, wallet, orgMspId){
        try {
                // Check to see if we've already enrolled the admin user.
                const identity = await wallet.get(adminUserId);
                if (identity) {
                        console.log('An identity for the admin user already exists in the wallet');
                        return;
                }

                // Enroll the admin user, and import the new identity into the wallet.
                const enrollment = await caClient.enroll({ enrollmentID: adminUserId, enrollmentSecret: adminUserPasswd });
                const x509Identity = {
                        credentials: {
                                certificate: enrollment.certificate,
                                privateKey: enrollment.key.toBytes(),
                        },
                        mspId: orgMspId,
                        type: 'X.509',
                };
                await wallet.put(adminUserId, x509Identity);
                console.log('Successfully enrolled admin user and imported it into the wallet');
        } catch (error) {
                console.error(`Failed to enroll admin user : ${error}`);
        }
};
async function registerAndEnrollUser(caClient, wallet, orgMspId, userId, affiliation){
        try {
                // Check to see if we've already enrolled the user
                const userIdentity = await wallet.get(userId);
                if (userIdentity) {
                        console.log(`An identity for the user ${userId} already exists in the wallet`);
                        return;
                }

                // Must use an admin to register a new user
                const adminIdentity = await wallet.get(adminUserId);
                if (!adminIdentity) {
                        console.log('An identity for the admin user does not exist in the wallet');
                        console.log('Enroll the admin user before retrying');
                        return;
                }

                // build a user object for authenticating with the CA
                const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
                const adminUser = await provider.getUserContext(adminIdentity, adminUserId);

                // Register the user, enroll the user, and import the new identity into the wallet.
                // if affiliation is specified by client, the affiliation value must be configured in CA
                const secret = await caClient.register({
                        affiliation: affiliation,
                        enrollmentID: userId,
                        role: 'client'
                }, adminUser);
                const enrollment = await caClient.enroll({
                        enrollmentID: userId,
                        enrollmentSecret: secret
                });
                const x509Identity = {
                        credentials: {
                                certificate: enrollment.certificate,
                                privateKey: enrollment.key.toBytes(),
                        },
                        mspId: orgMspId,
                        type: 'X.509',
                };
                await wallet.put(userId, x509Identity);
                console.log(`Successfully registered and enrolled user ${userId} and imported it into the wallet`);
        } catch (error) {
                console.error(`Failed to register user : ${error}`);
        }
};

async function buildWallet(Wallets, walletPath) {
        // Create a new  wallet : Note that wallet is for managing identities.
        let wallet;
        if (walletPath) {
                wallet = await Wallets.newFileSystemWallet(walletPath);
                console.log(`Built a file system wallet at ${walletPath}`);
        } else {
                wallet = await Wallets.newInMemoryWallet();
                console.log('Built an in memory wallet');
        }

        return wallet;
};
const wallet = await buildWallet(Wallets, walletPath);

await enrollAdmin(caClient, wallet, mspOrg1);
await registerAndEnrollUser(caClient, wallet, mspOrg1, org1UserId, 'org1.department1');
const gateway = new Gateway();
await gateway.connect(ccp, {
    wallet,
    identity: org1UserId,
    discovery: { enabled: true, asLocalhost: true }
});
export default gateway;
