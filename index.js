const myArgs = process.argv.slice(2);
const DataLoad = require('./lib/dataload.js');
let dataLoad = new DataLoad();

if (myArgs[0] === 'reset') {
  dataLoad.resetCollections()
    .then(dataLoad.resetStorage())
    .then(dataLoad.resetIndices())
    .then(() => console.log('we seem to be finished'))
    .catch(console.error);
} else {
  console.log('Pass the arg "reset" to cause the reset routine to execute.');
}


// const replaceStorageCollections = require('./lib/facade/cosmosdb').replaceStorageCollections;
// const deleteAllIndices = require('./lib/facade/elasticsearch');
// const deleteAllMetadataBlobs = require('./lib/facade/blob').deleteAllMetadataBlobs;

// const myArgs = process.argv.slice(2);

// async function done() {
//   console.log('we seem to be finished');
// }

// if (myArgs[0] === 'reset') {
//   deleteAllMetadataBlobs();
//   replaceStorageCollections()
//     .then(deleteAllIndices)
//     .then(done)
//     .catch(console.error);
// } else {
//   console.log('Pass the arg "reset" to cause the reset routine to execute.');
// }
