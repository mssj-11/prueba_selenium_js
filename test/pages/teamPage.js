const { By, until } = require("selenium-webdriver");

class TeamPage {
    constructor(driver) {
        this.driver = driver;
        this.teamTable = By.css("#equipo table");
    }

    async isTeamTableDisplayed() {
        let table = await this.driver.wait(until.elementLocated(this.teamTable), 5000);
        return await table.isDisplayed();
    }
}

module.exports = TeamPage;