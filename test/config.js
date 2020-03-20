'use strict';

module.exports = {
  auth_host: 'https://login.microsoftonline.com/' + process.env.TENANT_ID,
  legal_host: 'https://' + process.env.OSDU_BASE + '-legal.azurewebsites.net',
  storage_host: 'https://' + process.env.OSDU_BASE + '-storage.azurewebsites.net',
  search_host: 'https://' + process.env.OSDU_BASE + '-search.azurewebsites.net',
  auth_params: {
    grant_type: 'client_credentials',
    client_id: process.env.PRINCIPAL_ID,
    client_secret: process.env.PRINCIPAL_SECRET,
    resource: process.env.CLIENT_ID
  },
  expectedCount: {
    file: 12777,
    well: 4947,
    wellbore: 6485,
    wellboremarker: 5904,
    wellboremarkerwpc: 5904,
    wellboretrajectory: 5944,
    wellboretrajectorywpc: 5944,
    welllog: 929,
    welllogwpc: 929
  },
  // expectedCount: {
  //   file: 12775,
  //   well: 4946,
  //   wellbore: 6784,
  //   wellboremarker: 5904,
  //   wellboremarkerwpc: 5904,
  //   wellboretrajectory: 5942,
  //   wellboretrajectorywpc: 5943,
  //   welllog: 929,
  //   welllogwpc: 929
  // }
}
