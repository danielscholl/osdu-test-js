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

# Execute All Tests
npm test

# Execute Individual Tests
npm run test:count
npm run test:legal
npm run test:schema
npm run test:search
npm run test:service

## Debug Individual Test
SEARCH_FOLDER="../search_fail" LOG_LEVEL=debug npm run test:search
```

## TODO

- Add Additional Search Tests

- Add Docker support to reduce requirements purely to Docker
