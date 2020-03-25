'use strict';

const request = require("supertest");
const CosmosClient = require("@azure/cosmos").CosmosClient;
const {BlobServiceClient, StorageSharedKeyCredential} = require("@azure/storage-blob");
const config = require('../config');


module.exports = function () {
  let self = this;

  self.resetStorage = async () => {
    const accountName = config.storage.account;
    const key = config.storage.key;
    const searchParams = {
      prefix: `${config.osdu.partition}:${config.osdu.namespace}`
    };

    let creds = new StorageSharedKeyCredential(accountName, key);
    let client = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, creds);
    let containerClient = await client.getContainerClient(config.osdu.partition);
    console.log('Connected to StorageAccount.');

    let i = 1;
    for await (const blob of containerClient.listBlobsFlat(searchParams)) {
      i++;
      if ((i % 100) === 0) console.log(`Blob ${i}: ${blob.name}`);

      const blockBlobClient = containerClient.getBlockBlobClient(blob.name);
      await blockBlobClient.delete();
    }
  };

  self.resetCollections = async () => {
    const endpoint = config.cosmosdb.host;
    const key = config.cosmosdb.key;
    const id = config.cosmosdb.collection;

    let client = new CosmosClient({endpoint, key});
    let db = client.database(config.cosmosdb.database);
    console.log('Connected to CosmosDB.');

    let container = await db.container(id);
    console.log('Retrieved Cosmos Container.');

    await container.delete();
    console.log('Deleted Cosmos Container.');

    await db.containers.create({id, partitionKey: {paths: ["/id"]}}, {offerThroughput: 400});
    console.log('Created Cosmos Container.');
  };

  self.resetIndices = async () => {
    const api = request(config.elastic.host);

    return api.delete(`/${config.osdu.partition}*`)
      .set('Content-Type', 'application/json')
      .set('Authorization', 'Basic ' + config.elastic.key)
      .then((res) => {
        let result = {status: res.status, body: res.body};
        if (res.status !== 200) {
          throw result
        }

        console.log('Deleted Elastic Search Indices.');
        console.log(result);
        return result;
      });
  };

  return self;
};
