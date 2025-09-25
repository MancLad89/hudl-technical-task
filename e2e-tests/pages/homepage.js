exports.Homepage = class Homepage {
  constructor(page) {
    this.page = page;
    this.elements = {
      siteLogo: this.page.getByTestId('site-logo'),
      logIn: this.page.getByTestId('login-select'),
    };
  }

  async goTo() {
    await this.page.goto('/', { waitUntil: 'load' });
    await this.page.waitForLoadState('networkidle');
  }

  async clickLogin() {
    await this.elements.logIn.click();
  }
};
