# Data Load Test Harness

>Note: This is a temporary proof of concept.

This is a Test Harness for testing an OSDU Azure Environment Default Data Load

### Tool PreReqs

- nodejs (lts/erbium)
- direnv

### Instructions


```bash
# Clone the Repository
git clone https://github.com/danielscholl/osdu-test-js.git

# Execute Individual Tests
npm run test:service
npm run test:count
npm run test:legal
npm run test:schema
npm run test:search
npm run test:search:custom
SEARCH_FOLDER="../search_enrich" npm run test:search

# Execute All Tests
npm test

## Debug Alternate Folder Tests
SEARCH_FOLDER="../search_fail" LOG_LEVEL=debug npm run test:search
```

## TODO

- Add Docker support to reduce requirements purely to Docker
