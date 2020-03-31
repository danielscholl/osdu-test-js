const myArgs = process.argv.slice(2);
const DataLoad = require('./lib/dataload.js');
let dataLoad = new DataLoad();

if (myArgs[0] === 'reset') {
  dataLoad.resetCollections()
    .then(dataLoad.resetIndices)
    .then(dataLoad.resetStorage)
    .then(() => console.log('we seem to be finished'))
    .catch(console.error);
} else {
  console.log('Pass the arg "reset" to cause the reset routine to execute.');
}


// const replaceStorageCollections = require('./lib/facade/cosmosdb').replaceStorageCollections;
// const deleteAllIndices = require('./lib/facade/elasticsearch').deleteAllIndices;
// const deleteAllMetadataBlobs = require('./lib/facade/blob').deleteAllMetadataBlobs;

// const myArgs = process.argv.slice(2);

// async function done(a) {
//   console.log('we seem to be finished', a);
// }

// async function work() {
//   await deleteAllMetadataBlobs()
// }

// if (myArgs[0] === 'reset') {
//   replaceStorageCollections()
//     .then(deleteAllIndices)
//     .then(deleteAllMetadataBlobs)
//     .then(done)
//     .catch(console.error);
// } else {
//   console.log('Pass the arg "reset" to cause the reset routine to execute.');
// }
