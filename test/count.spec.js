'use strict';

const should = require('chai').Should();
const request = require("supertest");
const config = require('./config');

describe('Count by Kind Validation Checks', () => {
  let oAuth = request(config.auth_host + '/oauth2');
  let apiHost = request(config.search_host);
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
    const schema = require('../schema/file/file_schema.json');
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
    const schema = require('../schema/master-data/well/well_schema.json');
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
    const schema = require('../schema/master-data/wellbore/wellbore_schema.json');
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
    const schema = require('../schema/work-product/WellboreMarker/WellboreMarker_schema.json');
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
    const schema = require('../schema/work-product/WellboreMarkerComponent/WellboreMarkerComponent_schema.json');
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
    const schema = require('../schema/work-product/WellboreTrajectory/WellboreTrajectory_schema.json');
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
    const schema = require('../schema/work-product/WellboreTrajectoryComponent/WellboreTrajectoryComponent_schema.json');
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
    const schema = require('../schema/work-product/WellLog/WellLog_schema.json');
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
    const schema = require('../schema/work-product/WellLogComponent/WellLogComponent_schema.json');
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
