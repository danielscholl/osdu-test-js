# Data Load Test Harness

>Note: This is a temporary proof of concept.

This is a Test Harness for testing an OSDU Azure Environment Default Data Load

### Tool PreReqs

- nodejs (lts/erbium)
- direnv

### Instructions

#### Clone the Repository

#### Setup the Environment (.env)

```

# Login to the CLI
az login --tenant $ARM_TENANT_ID --service-principal -u $ARM_CLIENT_ID -p $ARM_CLIENT_SECRET
az keyvault secret show --vault-name ado-prod-jnw-jnwijvfg-kv --name elastic-endpoint --query value -otsv
```


```bash
# Clone the Repository
git clone https://github.com/danielscholl/osdu-test-js.git

# Execute Individual Tests
npm run test:service
npm run test:count
FOLDER="../legal" npm run test:legal
FOLDER="../schema" npm run test:schema
FOLDER="../search" npm run test:search
VERSION="0.2.0" npm run test:search:custom


## Debug Alternate Folder Tests
FOLDER="../search_fail" LOG_LEVEL=debug npm run test:search
```

## TODO

- Add Docker support to reduce requirements purely to Docker
