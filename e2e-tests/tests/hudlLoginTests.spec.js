const { test } = require('@playwright/test');
const { Homepage } = require('../pages/homepage');
const { HudlHomepage } = require('../pages/hudlHomepage');
const { HudlLoginPage } = require('../pages/hudlLoginPage');
const { LoginDrawer } = require('../pages/components/loginDrawer');
const validEmail = process.env.VALID_EMAIL;
const validPassword = process.env.VALID_PASSWORD;

let homepage, hudlLoginPage, loginDrawer, hudlHomepage;
test.describe('Tests hudl login', async () => {
  test.beforeEach(async ({ page }) => {
    loginDrawer = new LoginDrawer(page);
    homepage = new Homepage(page);
    hudlLoginPage = new HudlLoginPage(page);
    hudlHomepage = new HudlHomepage(page);

    await homepage.goTo();
    await homepage.clickLogin();
    await loginDrawer.clickHudlLogin();
  });

  test('Unable to navigate to Hudl homepage without login', async () => {
    await hudlHomepage.goTo();
    await hudlLoginPage.assertUrl();
  });

  test('Assert Hudl login page url & parameters', async () => {
    await hudlLoginPage.assertUrl();
  });

  test('Assert email is required', async () => {
    await hudlLoginPage.enterEmailAndClickContinue('');
    await hudlLoginPage.assertEmailRequired();
  });

  test('Assert email is valid', async () => {
    await hudlLoginPage.enterEmailAndClickContinue('something@');
    await hudlLoginPage.assertEmailIsValid();
  });

  test('Assert email field is populated', async () => {
    await hudlLoginPage.enterEmailAndClickContinue(validEmail);
    await hudlLoginPage.assertEmailIsPopulated(validEmail);
  });

  test('Assert password required - registered email', async () => {
    await hudlLoginPage.enterEmailAndClickContinue(validEmail);
    await hudlLoginPage.enterPasswordAndClickContinue('Password');
    await hudlLoginPage.assertEmailOrPasswordError();
  });

  test('Assert password required - not registered email', async () => {
    await hudlLoginPage.enterEmailAndClickContinue('notRegistered@gmail.com');
    await hudlLoginPage.enterPasswordAndClickContinue('Password');
    await hudlLoginPage.assertEmailOrPasswordError();
  });

  test('Hudl login & assert homepage url', async () => {
    await hudlLoginPage.enterEmailAndClickContinue(validEmail);
    await hudlLoginPage.enterPasswordAndClickContinue(validPassword);
    await hudlHomepage.assertUrl();
  });

  test('Hudl login & assert correct user', async () => {
    await hudlLoginPage.enterEmailAndClickContinue(validEmail);
    await hudlLoginPage.enterPasswordAndClickContinue(validPassword);
    await hudlHomepage.assertLoggedInUser(validEmail);
  });

  test('Logged in - navigate to homepage and attempt login', async () => {
    await hudlLoginPage.enterEmailAndClickContinue(validEmail);
    await hudlLoginPage.enterPasswordAndClickContinue(validPassword);
    await homepage.goTo();
    await homepage.clickLogin();
    await loginDrawer.clickHudlLogin();
    await hudlHomepage.assertLoggedInUser(validEmail);
  });
});
