'use strict';

const should = require('chai').Should();
const request = require("supertest");
const config = require('./config');

describe('Schema Validation Checks', () => {
  let oAuth = request(config.auth_host + '/oauth2');
  let apiHost = request(config.storage_host);
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


  describe('Well Schema', (done) => {
    const schema = require('../schema/master-data/well/well_schema.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('Well Schema Enriched', (done) => {
    const schema = require('../schema/master-data/well/well_schema_enrich.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('Wellbore Schema', (done) => {
    const schema = require('../schema/master-data/wellbore/wellbore_schema.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('Wellbore Schema Enriched', (done) => {
    const schema = require('../schema/master-data/wellbore/wellbore_schema_enrich.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('File Schema', (done) => {
    const schema = require('../schema/file/file_schema.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('File Schema Enriched', (done) => {
    const schema = require('../schema/file/file_schema_enrich.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellLog Schema', (done) => {
    const schema = require('../schema/work-product/WellLog/WellLog_schema.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellLog Schema Enriched', (done) => {
    const schema = require('../schema/work-product/WellLog/WellLog_schema_enrich.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellboreMarker Schema', (done) => {
    const schema = require('../schema/work-product/WellBoreMarker/WellboreMarker_schema.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellboreMarker Schema Enriched', (done) => {
    const schema = require('../schema/work-product/WellBoreMarker/WellboreMarker_schema_enrich.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellboreMarker Component Schema', (done) => {
    const schema = require('../schema/work-product/WellBoreMarkerComponent/WellboreMarkerComponent_schema.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellboreMarker Component Schema Enriched', (done) => {
    const schema = require('../schema/work-product/WellBoreMarkerComponent/WellboreMarkerComponent_schema_enrich.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellboreTrajectory Schema', (done) => {
    const schema = require('../schema/work-product/WellBoreTrajectory/WellboreTrajectory_schema.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellboreTrajectoryComponent Schema', (done) => {
    const schema = require('../schema/work-product/WellboreTrajectoryComponent/WellboreTrajectoryComponent_schema.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

  describe('WellboreTrajectoryComponent Schema Enriched', (done) => {
    const schema = require('../schema/work-product/WellboreTrajectoryComponent/WellboreTrajectoryComponent_schema_enrich.json');
    let result = null;

    it('schema is retrieved by kind', (done) => {
      apiHost.get('/schemas/' + schema.kind)
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

    it('should be the correct schema', () => result.should.be.deep.equal(schema));
  });

});
