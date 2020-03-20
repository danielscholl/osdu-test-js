'use strict';

const path = require("path")
const fs = require("fs")
const directoryPath = path.join(__dirname, "../search");

const should = require('chai').Should();
const request = require("supertest");
const config = require('./config');

let oAuth = request(config.auth_host + '/oauth2');
let apiHost = request(config.search_host);

const partition = 'opendes';
let token = null;

fs.readdir(directoryPath, function (err, files) {
  if (err) {
    console.log("Error getting directory information.")
  } else {
    files.forEach(function (file) {

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

      describe("Search Validation Check: " + file, (done) => {
        let data = null;
        const params = require('../search/' + file);

        it("query: " + params.query, (done) => {
          apiHost.post('/api/search/v2/query')
            .set('Authorization', token)
            .set('data-partition-id', partition)
            .send(params)
            .expect(200)
            .then((res) => {
              res.body.should.be.an('object');
              data = res.body;
              done();
            });
        });

        it("should find at least 1", () => data.totalCount.should.be.at.least(1));
      });
    });
  }
});
