./network.sh up -ca -s couchdb
./network.sh createChannel && source ./peer.sh  
peer lifecycle chaincode package custom.tar.gz --path asset-transfer-custom/chaincode-custom/ --lang node --label custom_1.0

for org 1
source ./org1.sh
peer lifecycle chaincode install custom.tar.gz

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com  --channelID mychannel  --name custom --version 1.0 --package-id custom_1.0:5a9cad8e6cb47cc8edef6f178e113b8f3155550955e23635c81758fb72802e55 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem && peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name custom --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json

for org 2
source ./org2.sh
peer lifecycle chaincode install custom.tar.gz

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com  --channelID mychannel  --name custom --version 1.0 --package-id custom_1.0:5c3645ba854a891939e98c08bfde56dc2c6014f7683a04a97c2ec552e3df256d --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem && peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name custom --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json

for org 3
source ./org3.sh
peer lifecycle chaincode install custom.tar.gz

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com  --channelID mychannel  --name custom --version 1.0 --package-id custom_1.0:5c3645ba854a891939e98c08bfde56dc2c6014f7683a04a97c2ec552e3df256d --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem && peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name custom --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json

for org 4
source ./org4.sh
peer lifecycle chaincode install custom.tar.gz

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com  --channelID mychannel  --name custom --version 1.0 --package-id custom_1.0:5c3645ba854a891939e98c08bfde56dc2c6014f7683a04a97c2ec552e3df256d --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem && peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name custom --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json

for org 5
source ./org5.sh
peer lifecycle chaincode install custom.tar.gz

peer lifecycle chaincode approveformyorg -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com  --channelID mychannel  --name custom --version 1.0 --package-id custom_1.0:5c3645ba854a891939e98c08bfde56dc2c6014f7683a04a97c2ec552e3df256d --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem && peer lifecycle chaincode checkcommitreadiness --channelID mychannel --name custom --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --output json

for all at last 
peer lifecycle chaincode commit -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com  --channelID mychannel --name custom --version 1.0 --sequence 1 --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt   --peerAddresses localhost:8011 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt  --peerAddresses localhost:7091 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt --peerAddresses localhost:8031 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org5.example.com/peers/peer0.org5.example.com/tls/ca.crt

peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile ${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem -C mychannel -n custom --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt --peerAddresses localhost:8011 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt --peerAddresses localhost:7091 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org4.example.com/peers/peer0.org4.example.com/tls/ca.crt  --peerAddresses localhost:8031 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org5.example.com/peers/peer0.org5.example.com/tls/ca.crt -c '{"function":"InitLedger","Args":[]}'
