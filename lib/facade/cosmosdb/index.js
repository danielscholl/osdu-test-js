const CosmosClient = require("@azure/cosmos").CosmosClient;

require("dotenv").config();

const endpoint = process.env.COSMOSDB_URI;
const key = process.env.COSMOSDB_KEY;
module.exports.replaceStorageCollections = async function () {
  let client = new CosmosClient({endpoint, key});

// Creating the link
  let database = client.database(process.env.COSMOSDB_DATABASE);
  await deleteContainer(database, "StorageRecord");
  return await addContainer(database, "StorageRecord", "/id")
  // await deleteContainer(database, "StorageSchema");
  // return await addContainer(database, "StorageSchema", "/kind")
};

async function addContainer(database, id, path) {
  const containerDefinition = {
    id,
    partitionKey: {
      paths: [path]
    }
  };
  const requestOptions = {
    offerThroughput: 400 // RU/s
  };
  console.log(`Creating CosmosDb container ${id}.`)
  return await database.containers.create(containerDefinition, requestOptions);
}

async function deleteContainer(database, id) {
  try {
    let cont = await database.container(id);
    let f = await cont.read();
    console.log(`Deleting CosmosDb container ${id}.`)
    return await cont.delete();
  } catch (error) {
    console.log('Swallowing error and continuing. Error was:', error);
  }
}
