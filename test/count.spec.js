'use strict';

const should = require('chai').Should();
const request = require("supertest");
const config = require('../config');

describe('Count by Kind Validation Checks', () => {
  let oAuth = request(config.api_host.auth + '/oauth2');
  let apiHost = request(config.api_host.search);
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

  describe('file counts', (done) => {
    const schema = require('../schema/file_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.file));
  });


  describe('well-master counts', (done) => {
    const schema = require('../schema/well_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.well));
  });

  describe('wellbore-master counts', (done) => {
    const schema = require('../schema/wellbore_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.wellbore));
  });

  describe('wellboremarker-wp counts', (done) => {
    const schema = require('../schema/WellboreMarker_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.wellboremarker));
  });

  describe('wellboremarker-wpc counts', (done) => {
    const schema = require('../schema/WellboreMarkerComponent_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.wellboremarkerwpc));
  });

  describe('wellboretrajectory-wp counts', (done) => {
    const schema = require('../schema/WellboreTrajectory_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.wellboretrajectory));
  });

  describe('wellboretrajectory-wpc counts', (done) => {
    const schema = require('../schema/WellboreTrajectoryComponent_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.wellboretrajectorywpc));
  });

  describe('welllog-wp counts', (done) => {
    const schema = require('../schema/WellLog_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.welllog));
  });

  describe('welllog-wpc counts', (done) => {
    const schema = require('../schema/WellLogComponent_schema.json');
    let data = null;
    let params = {
      kind: schema.kind,
      offset: 0,
      limit: 1
    }

    it('item is searched for by kind', (done) => {
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

    it('should be the correct count', () => data.totalCount.should.be.equal(config.expectedCount.welllogwpc));
  });

});
