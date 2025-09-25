exports.LoginDrawer = class LoginDrawer {
  constructor(page) {
    this.page = page;
    this.elements = {
      hudlLogin: this.page.getByTestId('login-hudl'),
      wyscountLogin: this.page.getByTestId('login-wyscout'),
      signalLogin: this.page.getByTestId('login-signal'),
      statsLogin: this.page.getByTestId('login-statsbomb'),
      instatBasketballLogin: this.page.getByTestId('login-instatbasketball'),
      instatHockeyLogin: this.page.getByTestId('login-instathockey'),
      iqLogin: this.page.getByTestId('login-iq'),
      balltimeLogin: this.page.getByTestId('login-balltime'),
      titanLogin: this.page.getByTestId('login-titan'),
      fastScoutLogin: this.page.getByTestId('login-fastscout'), //duplicate menu option for fastScout, reported
    };
  }

  async clickHudlLogin() {
    await this.elements.hudlLogin.click();
  }
};
