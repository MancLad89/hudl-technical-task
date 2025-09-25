const { expect } = require('@playwright/test');
const url = 'https://www.hudl.com/home';

exports.HudlHomepage = class HudlHomepage {
  constructor(page) {
    this.page = page;
    this.elements = {
      logo: this.page.getByTestId('webnav-globalnav-home'),
      profile: this.page.locator('[class="hui-globaluseritem__email"]'),
    };
  }

  async goTo() {
    await this.page.goto(url);
  }

  async assertUrl() {
    await expect(this.page).toHaveURL('https://www.hudl.com/home');
  }

  async assertLoggedInUser(email) {
    await expect(this.elements.profile).toHaveText(email);
  }
};
