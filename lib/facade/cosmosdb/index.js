const CosmosClient = require("@azure/cosmos").CosmosClient;

require("dotenv").config();

const endpoint = process.env.COSMOSDB_URI;
const key = process.env.COSMOSDB_KEY;
const name = "StorageRecord";

module.exports.replaceStorageRecordCollection = async function() {
  let client = new CosmosClient({endpoint, key});

// Creating the link
  let database = client.database(process.env.COSMOSDB_DATABASE);
  await deleteContainer(database, name);
  return await addContainer(database, name)
};

async function addContainer(database, id) {
  const containerDefinition = {
    id,
    partitionKey: {
      paths: ['/kind']
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
