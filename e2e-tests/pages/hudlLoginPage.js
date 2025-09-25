const { expect } = require('@playwright/test');

exports.HudlLoginPage = class HudlLoginPage {
  constructor(page) {
    this.page = page;
    this.elements = {
      email: this.page.locator('[inputmode="email"]'),
      password: this.page.locator('[id="password-label"]'),
      continueBtn: this.page
        .locator('[type="submit"]')
        .filter({ hasText: 'Continue' }),
      populatedEmail: this.page.locator(
        '[class="ulp-authenticator-selector-text"]'
      ),
    };
    this.errorStates = {
      usernameRequired: this.page.locator('[id="error-cs-username-required"]'),
      emailInvalid: this.page.locator('[id="error-cs-email-invalid"]'),
      emailOrPasswordIncorrect: this.page.locator(
        '[id="error-element-password"]'
      ),
    };
  }

  async assertUrl() {
    const base = new RegExp('identity.hudl.com/u/login/identifier');
    const urlParams = new RegExp('state=');
    await this.page.waitForURL(base);
    await this.page.waitForURL(urlParams);
  }

  async enterEmailAndClickContinue(email) {
    await this.elements.email.fill(email);
    await this.elements.continueBtn.first().click();
  }

  async assertEmailRequired() {
    await expect(this.errorStates.usernameRequired).toBeVisible();
  }

  async assertEmailIsValid() {
    await expect(this.errorStates.emailInvalid).toBeVisible();
  }

  async assertEmailIsPopulated(email) {
    await expect(this.elements.populatedEmail).toHaveText(email);
  }

  async enterPasswordAndClickContinue(password) {
    await this.elements.password.fill(password);
    await this.elements.continueBtn.first().click();
  }

  async assertEmailOrPasswordError() {
    await expect(this.errorStates.emailOrPasswordIncorrect).toBeVisible();
  }
};
