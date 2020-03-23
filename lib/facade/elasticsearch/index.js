require("dotenv").config();
const request = require('request');
const options = {
  'method': 'DELETE',
  'url': `${process.env.ES_ENDPOINT}/${process.env.DATA_PARTITION_ID}*`,
  'headers': {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${process.env.ES_AUTH_TOKEN}`
  }
};

module.exports.deleteAllIndices = async function () {
  return request(options, function (error, response) {
    if (error) throw new Error(error);
    console.log(`Deleted indices: /${process.env.DATA_PARTITION_ID}*`, response.body);
  });
};
