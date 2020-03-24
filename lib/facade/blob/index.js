// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

const { BlobServiceClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const config = require('../../../config');

let blobServiceClient;
let containerClient;

let accountName = config.storage.account;
let key = config.storage.key;
let datapartitionid = config.osdu.partition;
let dataprefix = config.osdu.namespace;

function connect() {
  console.log("Establishing Storage Connection");
  const creds = new StorageSharedKeyCredential(accountName, key);
  return new BlobServiceClient(`https://${accountName}.blob.core.windows.net`,
    creds);
}

async function deleteBlobs(containerClient) {
  let i = 1;
  for await (const blob of containerClient.listBlobsFlat({
    prefix: `${datapartitionid}:${dataprefix}`
  })) {
    i++;
    if ((i % 100) === 0) console.log(`Blob ${i}: ${blob.name}`);
    await deleteBlob(blob.name);
  }
}

async function deleteBlob(blobName) {
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  await blockBlobClient.delete();
}

async function main() {
  blobServiceClient = await connect();
  containerClient = await blobServiceClient.getContainerClient(datapartitionid);
  await deleteBlobs(containerClient);
}

main().catch((err) => {
  console.error("Error running sample:", err.message);
});

module.exports.deleteAllMetadataBlobs = main;
