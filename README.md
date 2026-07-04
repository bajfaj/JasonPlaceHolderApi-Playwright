# JSONPlaceholder API - Playwright

API test automation for JSONPlaceholder using Playwright Test + AJV schema validation. 

Migrated from Supertest + Cucumber to Playwright for better TypeScript support, built-in parallelism, and simpler syntax.

## Tech Stack
- **Test Runner**: Playwright Test
- **Schema Validation**: AJV + ajv-formats
- **Language**: TypeScript
- **API Under Test**: https://jsonplaceholder.typicode.com

## Project Structure

```
JASONPLACEHOLDERAPI-PLAYWRIGHT/
├── tests/
│   ├── helpers/
│   │   └── validate.ts          # AJV wrapper for schema validation
│   ├── schemas/
│   │   ├── post.schema.json     # JSON schema for Post object
│   │   └── user.schema.json     # JSON schema for User object
│   └── posts.spec.ts            # All 7 API tests
├── playwright.config.ts         # Playwright configuration
└── package.json
```


## Getting Started

### 1. Install dependencies
```bash
npm install
npx playwright install

2. Run all tests
```bash
npm test

3. Run specific test file
```bash
npx playwright test posts.spec.ts

4. Run in headed/debug mode
```bash
npx playwright test --debug

View Test Report
After a test run:
```bash
npm run test:report
Or: npx playwright show-report

Test Coverage
7 tests covering JSONPlaceholder /posts and /users endpoints:
TestEndpointValidation1GET /postsArray length, status2GET /posts/1AJV schema, status3POST /postsAJV schema, status4PUT /posts/1AJV schema, field value5DELETE /posts/1Empty object, status6GET /users/1AJV schema, email format7POST /postsAJV schema, response fields

Schema Validation
Uses AJV to enforce API contracts. Example: PostSchema validates id, userId, title, body types. UserSchema validates nested objects + email format via ajv-formats.Failed validation throws detailed errors showing exactly which field broke the contract.

Migration Notes
Old stack: Cucumber + Supertest + ts-node
New stack: Playwright Test + AJV
Why migrate:
1. Playwright has native API testing - no Supertest needed
2. Better TypeScript integration than Cucumber step-defs
3. Built-in parallel execution, retries, HTML reports
4. Simpler file structure - no .feature files + glue code