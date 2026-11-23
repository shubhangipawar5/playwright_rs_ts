import { test, expect } from '@playwright/test';

test('environment variables', async({page}, testInfo)=>{
// await page.goto('/')
// const baseUrl = process.env.BASE_URL;   if we have to read like this with env then trigger with baseurl=>>  BASE_URL='https://your-dev-site.example' npx playwright test --ui --project=dev   //If you specifically need the configured URL as a variable, read it from testInfo:


  console.log(testInfo.project.use.baseURL);
await page.goto('./');   //access projects baseurl in config

})


// with dotenv 
test('dotenv variaables access', async({page})=>{
const testEnv = process.env.TEST_ENV ?? 'dev';
const baseURL =
  testEnv === 'stage'
    ? process.env.STAGE_BASE_URL
    : process.env.DEV_BASE_URL;

if (!baseURL) {
  throw new Error(`Base URL is not configured for ${testEnv}`);
}
await page.goto(baseURL); 
console.log(baseURL)
/*
dotenv reads values from your .env file and adds them to process.env. Playwright doesn’t load .env files automatically.

You only need it when you want config like process.env.BASE_URL to read values stored in .env. If CI or your terminal sets the environment variables directly, you don’t need dotenv. It’s already installed in this project.
*/

});



/*.    npx playwright test --ui --project=dev
in a Playwright test, read environment variables through Node’s process.env:
const baseUrl = process.env.BASE_URL;
Set the variable when running the test:
BASE_URL=https://example.com npx playwright test
Then use it, with a fallback if it isn’t set:
await page.goto(process.env.BASE_URL ?? 'https://example.com');
For a .env file, install and configure a package such as dotenv; Playwright doesn’t automatically load .env files.


******
testInfo is metadata about the current test run. It’s passed as the second argument to the test callback:
test('example', async ({ page }, testInfo) => {
  console.log(testInfo.title);    // test name
  console.log(testInfo.retry);    // retry number
  console.log(testInfo.timeout);  // timeout in milliseconds
});
Use process.env for values you supply from outside the test, such as BASE_URL. Use testInfo for details Playwright provides about the running test, such as its title, status, project, and output paths.
*/


//for multiple environments
/*
const testEnv = process.env.TEST_ENV ?? 'dev';

const baseURLs: Record<string, string | undefined> = {
  dev: process.env.DEV_BASE_URL,
  stage: process.env.STAGE_BASE_URL,
  qa: process.env.QA_BASE_URL,
  prod: process.env.PROD_BASE_URL,
};

const baseURL = baseURLs[testEnv];

if (!baseURL) {
  throw new Error(`No base URL configured for environment: ${testEnv}`);
}

###
Record<string, string | undefined> is a TypeScript type for an object:
- The keys are strings.
- Each value is either a string or undefined.


A lookup object maps a key to a value. In this example, the environment name is the key and its URL is the value:
It’s like a small dictionary, so you can select a URL by environment name instead of writing a long chain of if statements or ternaries.

  */