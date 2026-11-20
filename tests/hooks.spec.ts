import { test, expect } from '@playwright/test';




test.describe('tets case suite', () => {
    test.beforeAll(()=>{
        console.log('before all test cases')
    })
    test.beforeEach(async ({ page }) => {
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const username = page.locator('#username.form-control')
        await username.fill('rahulshettyacademy')
        //get by role

        await page.getByRole('textbox', { name: 'password' }).fill('Learning@830$3mK2') //this we can also use with getby label

        //get by role
        await page.getByRole('button', { name: 'Sign In' }).click();
    })
     test.afterEach(()=>{
        console.log('after each test cases')
    })


    test('login', { tag: ['@login', '@smoke'] }, async ({ page }) => {
        console.log('test 1')
    })


    test('login2', { tag: ['@login', '@smoke'] }, async ({ page }) => {
        console.log('test 2')
    })


 test.afterAll(()=>{
        console.log('after all test cases')
    })

})