import { test, expect } from './myfixtures';


test('log in rs-web using myfixtures', async({loggedInPage})=>{
      await expect(loggedInPage.getByText('ProtoCommerce Home').first()).toBeVisible();
});