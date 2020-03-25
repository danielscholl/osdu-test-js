'use strict';

const request = require("supertest");
const config = require('../../../config');
const api = request(config.elastic.host)

module.exports = async function request() {

  return api.delete(`/${config.osdu.partition}*`)
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Basic ' + config.elastic.key)
    .then((res) => {
      let result = { status: res.status, body: res.body };
      if (res.status !== 200) { throw result }

      console.log('Deleted Elastic Search Indices.')
      console.log(result);
      return result;
    });
}
