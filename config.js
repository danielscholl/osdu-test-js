'use strict';
require("dotenv").config();

module.exports = {
  api_host: {
    auth: `https://login.microsoftonline.com/${process.env.TENANT_ID}`,
    legal: `https://${process.env.OSDU_BASE}-legal.azurewebsites.net`,
    storage: `https://${process.env.OSDU_BASE}-storage.azurewebsites.net`,
    search: `https://${process.env.OSDU_BASE}-search.azurewebsites.net`,
  },
  auth_params: {
    grant_type: 'client_credentials',
    client_id: process.env.PRINCIPAL_ID,
    client_secret: process.env.PRINCIPAL_SECRET,
    resource: process.env.CLIENT_ID
  },
  fileDir: {
    schema: process.env.FOLDER || '../schema',
    legal: process.env.FOLDER || '../legal',
    search: process.env.FOLDER || '../search'
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
  osdu: {
    partition: process.env.DATA_PARTITION_ID || "opendes",
    namespace: process.env.DATA_PREFIX || "osdu",
    version: process.env.SCHEMA_VERSION || "2.0.0"
  },
  storage: {
    account: process.env.STORAGE_ACCOUNT_NAME,
    key: process.env.STORAGE_ACCOUNT_KEY
  },
  elastic: {
    host: process.env.ES_ENDPOINT,
    key: process.env.ES_AUTH_TOKEN
  },
  cosmosdb: {
    host: process.env.COSMOSDB_URI,
    key: process.env.COSMOSDB_KEY,
    id: process.env.COSMOSDB_DB_ID,
    collection: process.env.COSMOSDB_COLLECTION || "StorageRecord",
    database: process.env.COSMOSDB_DATABASE || "dev-osdu-r2-db"
  }
}
