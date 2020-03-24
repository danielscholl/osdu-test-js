'use strict';

const path = require("path")
const fs = require("fs")
const should = require('chai').Should();
const request = require("supertest");
const config = require('../config');

let oAuth = request(config.api_host.auth + '/oauth2');
let apiHost = request(config.api_host.storage);

const directoryPath = path.join(__dirname, config.fileDir.schema);
const partition = 'opendes';
let token = null;

fs.readdir(directoryPath, (err, files) => {
  if (err) {
    console.log("Error getting directory information.")
  } else {
    files.forEach(file => {
      let data = null;

      before((done) => {
        // Get a new OAuth Token
        oAuth.post('/token')
          .set('Content-Type', 'application/x-www-form-urlencoded')
          .send(config.auth_params)
          .then((res) => {
            token = 'Bearer ' + res.body.access_token;
            done();
          });
      });

      describe("Schema Validation Check: " + file, () => {
        const schema = require(config.fileDir.schema + '/' + file);

        it('schema is retrieved by kind', (done) => {
          apiHost.get('/schemas/' + schema.kind)
            .set('Authorization', token)
            .set('Accept', 'application/json')
            .set('data-partition-id', partition)
            .expect(200)
            .then((res) => {
              res.body.should.be.an('object');
              data = res.body;
              done();
            });
        });

        it('should be the correct schema', () => data.should.be.deep.equal(schema));
      });

      after((done) => {
        if (process.env.LOG_LEVEL === 'debug') {
          console.log(data);
        }
        done();
      });
    });
  }
});
