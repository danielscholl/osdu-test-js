const replaceStorageRecordCollection = require('./lib/facade/cosmosdb').replaceStorageRecordCollection;
const deleteAllIndices = require('./lib/facade/elasticsearch').deleteAllIndices;
const deleteAllMetadataBlobs = require('./lib/facade/blob').deleteAllMetadataBlobs;

const myArgs = process.argv.slice(2);

async function done(a) {
  console.log('we seem to be finished', a);
}

async function work() {
  await deleteAllMetadataBlobs()
}

if (myArgs[0] === 'reset') {
  deleteAllMetadataBlobs()
  // replaceStorageRecordCollection()
  //   .then(deleteAllIndices)
  //   .then(deleteAllMetadataBlobs)
    .then(done)
    .catch(console.error);
} else {
  console.log('Pass the arg "reset" to cause the reset routine to execute.');
}
