'use strict';

const path = require("path")
const fs = require("fs")
const should = require('chai').Should();
const request = require("supertest");
const config = require('./config');

let oAuth = request(config.auth_host + '/oauth2');
let apiHost = request(config.legal_host);

const directoryPath = path.join(__dirname, config.fileDir.legal);
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

      describe("LegalTag Validation Check: " + file, () => {
        const item = require(config.fileDir.legal + '/' + file);

        it('is retrieved by name', (done) => {
          apiHost.get('/legaltags/' + item.name)
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

        it('should be the correct item', () => data.should.be.deep.equal(item));
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
