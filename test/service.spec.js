'use strict';

const should = require('chai').Should();
const request = require("supertest");
const config = require('./config');
const invalidToken = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSIsImtpZCI6IllNRUxIVDBndmIwbXhvU0RvWWZvbWpxZmpZVSJ9.eyJhdWQiOiIxZDZmZGI5YS1jZGVmLTRiODItYmZhYS1lM2E1OGIzOWQ5NzUiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC81ODk3NWZkMy00OTc3LTQ0ZDAtYmVhOC0zN2FmMGJhYWMxMDAvIiwiaWF0IjoxNTg0NTU5MzU2LCJuYmYiOjE1ODQ1NTkzNTYsImV4cCI6MTU4NDU2MzI1NiwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhPQUFBQTNaNlE4bHFJWFh0RHB3RGhmVzgrc1hITXhkMWo4K1JEdmJOOFhhUFVYM2M3ZGtCYlRsa3MvNkxETjRkU01odFMiLCJhbXIiOlsicHdkIl0sImFwcGlkIjoiMWQ2ZmRiOWEtY2RlZi00YjgyLWJmYWEtZTNhNThiMzlkOTc1IiwiYXBwaWRhY3IiOiIxIiwiZmFtaWx5X25hbWUiOiJDYW1wIiwiZ2l2ZW5fbmFtZSI6IkJvb3QiLCJpcGFkZHIiOiI3My42NS42MS4yMTQiLCJuYW1lIjoiQm9vdCBDYW1wIiwib2lkIjoiMzMyMmQ4ZWEtN2ZlMS00NTk4LTgzMzgtMDZkNjI1YzM3MGIzIiwic2NwIjoiLjU4ZGVlYWRjLWNlOTItNDBlZC1iNTc5LWY3YmFmMDI3OGI3NCIsInN1YiI6IjlGUkdaVUctd3FtMkV5ZnF6bjNudm0zY1hXa2ZjazFFeVlSd21hbk1XOVUiLCJ0aWQiOiI1ODk3NWZkMy00OTc3LTQ0ZDAtYmVhOC0zN2FmMGJhYWMxMDAiLCJ1bmlxdWVfbmFtZSI6ImJvb3RjYW1wQGF6dXJlZ2xvYmFsMS5vbm1pY3Jvc29mdC5jb20iLCJ1cG4iOiJib290Y2FtcEBhenVyZWdsb2JhbDEub25taWNyb3NvZnQuY29tIiwidXRpIjoiNDBncFJ3aFd6RS15ODNDTFE1SXNBQSIsInZlciI6IjEuMCJ9.iSwiivwzTY5Q_hXaNguGlKYkUnLtM1y0JD-nuynj-aOX05D7GwnRCIlRT2k5Z-2vb8TbIMA_h7VbS6GG4bA1fCGgidgoLSm8NNaKkUjsHL77FfOiJ7s-Z2DmInGDlQrtYWY5huGd4HbWX3QtcwC-oOIawF-8RSlg55BgJTk-aOy1RuEAoV8f6YWsj4V46xnsRxbekNhb9Sh8JQMb_kxtOZ_nZ222wskJpoIe2ltyNDy423lYb7hTFSYS4FdDSsqgumwc5iNtZe1eTV7Jz6wsZjL8cvQMKwo_2CXNd1xeRDLdnZafK1jbNaBY7l-iGyD-AyUM9mOfBMwlbPjj3pCEWg"

describe('Service Validation Checks', () => {
  let result;
  let oAuth = request(config.auth_host + '/oauth2');

  describe('OAuth Client Credentials', () => {
    it('creates a token using principal id and secret', (done) => {

      // 1) Get OAuth Token
      oAuth.post('/token')
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .send(config.auth_params)
        .expect(200)
        .then((res) => {
          res.body.should.be.an('object');
          result = res.body;
          done();
        });
    });
    it('should have an access_token', () => result.access_token.should.exist);
    it('should be a bearer token', () => result.token_type.should.be.equal('Bearer'));
    it('should expire in 1 hour', () => result.expires_in.should.equal('3599'));
    it('should maintain requested scope', () => result.resource.should.be.equal(config.auth_params.resource));
  });

  describe('Service Authentication', () => {

    it('Legal Service returns 403 with expired token', (done) => {
      request(config.legal_host).get('/legaltags/dummy')
        .set('Accept', 'application/json')
        .set('Authorization', invalidToken)
        .expect(403, done);
    });

    it('Storage Service returns 403 with expired token', (done) => {
      request(config.storage_host).get('/schemas/dummy')
        .set('Accept', 'application/json')
        .set('Authorization', invalidToken)
        .expect(403, done);
    });

    it('Search Service returns 403 with expired token', (done) => {
      request(config.search_host).get('/api/search/v2/query')
        .set('Accept', 'application/json')
        .set('Authorization', invalidToken)
        .expect(403, done);
    });

  });

});
