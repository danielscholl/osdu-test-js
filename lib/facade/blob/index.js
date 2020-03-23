// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
 Setup: Enter your storage account name and shared key in main()
*/

const {BlobServiceClient, StorageSharedKeyCredential} = require("@azure/storage-blob");
const {DefaultAzureCredential} = require("@azure/identity");

// Load the .env file if it exists
require("dotenv").config({path: '../../../.env'});

let blobServiceClient;
let containerClient;

let accountName = process.env.METADATA_STORAGE_ACCOUNT_NAME;
let key = process.env.METADATA_STORAGE_ACCESS_KEY;
let datapartitionid = process.env.DATA_PARTITION_ID;
let dataprefix = process.env.DATA_PREFIX;

function connect() {
  // const creds = new DefaultAzureCredential(); // The AZURE_* creds I have aren't sufficent to perform this script
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
