const { expect } = require("chai");
const { getDriver } = require("./testConfig");
const HomePage = require("./pages/homePage");
const TeamPage = require("./pages/teamPage");

describe("Test de la tabla de jugadores", function () {
    let driver;
    let homePage;
    let teamPage;

    before(async function () {
        driver = await getDriver();
        homePage = new HomePage(driver);
        teamPage = new TeamPage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it("Debe mostrar la tabla de jugadores cuando se accede a 'El Equipo'", async function () {
        await homePage.open();
        let tableVisible = await teamPage.isTeamTableDisplayed();
        expect(tableVisible).to.be.true;
    });
});