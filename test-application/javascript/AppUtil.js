/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';
import fs from 'fs'
import path from 'path'
const __dirname = path.resolve(path.dirname(''))
function buildCCPOrg1 () {
	// load the common connection configuration file
	const ccpPath = path.resolve(__dirname, '..', '..','..' ,'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
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

function buildCCPOrg2 (){
	// load the common connection configuration file
	const ccpPath = path.resolve(__dirname, '..', '..','..',
		'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
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

function buildCCPOrg3(){
        // load the common connection configuration file
        const ccpPath = path.resolve(__dirname, '..', '..','..', 'organizations', 'peerOrganizations', 'org3.example.com', 'connection-org3.json');
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



function buildCCPOrg5(){
        // load the common connection configuration file
        const ccpPath = path.resolve(__dirname, '..', '..','..', 'organizations', 'peerOrganizations', 'org5.example.com', 'connection-org5.json');
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


function buildCCPOrg4 (){
	// load the common connection configuration file
	const ccpPath = path.resolve(__dirname, '..', '..','..', 'organizations', 'peerOrganizations', 'org4.example.com', 'connection-org4.json');
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


async function buildWallet(Wallets, walletPath){
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

function prettyJSONString(inputString){
	if (inputString) {
		 return JSON.stringify(JSON.parse(inputString), null, 2);
	}
	else {
		 return inputString;
	}
}
 export { buildWallet, buildCCPOrg1, buildCCPOrg2, buildCCPOrg3, buildCCPOrg4, buildCCPOrg5};
