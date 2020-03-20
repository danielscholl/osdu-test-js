'use strict';

const should = require('chai').Should();
const request = require("supertest");
const config = require('./config');


describe('Legal Validation Checks', () => {
  let oAuth = request(config.auth_host + '/oauth2');
  let apiHost = request(config.legal_host);
  const partition = 'opendes';
  let token = null;

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


  describe('Legal Tag', (done) => {
    let result = null;
    const legaltag = require('../legaltags/opendes-public-usa-dataset-1.json');

    it('is retrieved by kind', (done) => {
      apiHost.get('/legaltags/' + legaltag.name)
        .set('Authorization', token)
        .set('Accept', 'application/json')
        .set('data-partition-id', partition)
        .expect(200)
        .then((res) => {
          res.body.should.be.an('object');
          result = res.body;
          done();
        });
    });

    it('should be the correct legaltag', () => result.should.be.deep.equal(legaltag));
  });

});
