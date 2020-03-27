'use strict';

const should = require('chai').Should();
const request = require("supertest");
const config = require('../config');
const stringify = require("json-stringify-pretty-compact");

describe('Custom Search Validations', () => {
  let oAuth = request(config.api_host.auth + '/oauth2');
  let apiHost = request(config.api_host.search);
  let schemaVersion = process.env.VERSION || '0.2.0'
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

  describe('Count Wellbores for WellId', () => {

    let data = null;
    let params = {
      kind: "opendes:osdu:*:" + schemaVersion,
      query: "data.Data.IndividualTypeProperties.WellID:\"srn:master-data/Well:3687:\"",
      limit: 1
    }

    it('item is searched for', (done) => {
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

    it('should limit to 1 item', () => data.results.length.should.be.equal(1));

    after((done) => {
      if (process.env.LOG_LEVEL === 'debug') {
        console.log(stringify(data));
      }
      done();
    });
  });

  describe('Limit Returned Fields', () => {

    let data = null;
    let params = {
      kind: "opendes:osdu:*:" + schemaVersion,
      query: "data.ResourceTypeID: \"srn:type:work-product-component/WellLog:\"",
      returnedFields: [
        "data.ResourceID",
        "data.Data.IndividualTypeProperties.Name"
      ],
      limit: 1
    }

    it('item is searched for', (done) => {
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

    it('should return only 2 fields', () => Object.keys(data.results[0].data).length.should.be.equal(2));
    it('should return data.ResourceId', () => data.results[0].data.ResourceID.should.exist)
    it('should return data.Data.ResourceTypeID', () => data.results[0].data.ResourceID.should.exist)

    after((done) => {
      if (process.env.LOG_LEVEL === 'debug') {
        console.log(stringify(data));
      }
      done();
    });
  });

  describe('Group Results by Org', () => {

    let data = null;
    let params = {
      kind: "opendes:osdu:*:" + schemaVersion,
      query: "*",
      aggregateBy: "Data.IndividualTypeProperties.DataSourceOrganisationID",
      limit: 2
    }

    it('item is searched for', (done) => {
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

    it('should limit to 2 items', () => data.results.length.should.be.equal(2));
    // it('should have aggragations', () => data.aggregations.length.should.be.gt(0));

    after((done) => {
      if (process.env.LOG_LEVEL === 'debug') {
        console.log(stringify(data));
      }
      done();
    });
  });

  describe('Wellbore Page 1', () => {

    let data = null;
    let params = {
      kind: "opendes:osdu:*:" + schemaVersion,
      query: "data.Data.IndividualTypeProperties.WellID:\"srn:master-data/Well:3687:\"",
      offset: 0,
      limit: 1,
      sort: {
        field: [
          "data.Data.IndividualTypeProperties.SequenceNumber"
        ],
        order: [
          "ASC"
        ]
      }
    }

    it('item is searched for', (done) => {
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

    it('should limit to 1 item', () => data.results.length.should.be.equal(1));

    after((done) => {
      if (process.env.LOG_LEVEL === 'debug') {
        console.log(stringify(data));
      }
      done();
    });
  });

  describe('Wellbore Page 1', () => {

    let data = null;
    let params = {
      kind: "opendes:osdu:*:" + schemaVersion,
      query: "data.Data.IndividualTypeProperties.WellID:\"srn:master-data/Well:3687:\"",
      offset: 1,
      limit: 2,
      sort: {
        field: [
          "data.Data.IndividualTypeProperties.SequenceNumber"
        ],
        order: [
          "ASC"
        ]
      }
    }

    it('item is searched for', (done) => {
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

    it('should limit to 2 items', () => data.results.length.should.be.equal(2));

    after((done) => {
      if (process.env.LOG_LEVEL === 'debug') {
        console.log(stringify(data));
      }
      done();
    });
  });

});
