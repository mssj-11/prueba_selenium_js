const { expect } = require('chai');
const { getDriver } = require('./testConfig');
const HomePage = require('./pages/homePage');

describe('Test de la página de Barcelona - Título', function () {
    let driver;
    let homePage;

    before(async function () {
        driver = await getDriver();
        homePage = new HomePage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it('Debe abrir la página y verificar el título', async function () {
        await homePage.open();
        const title = await homePage.getTitle();
        expect(title).to.equal(homePage.title);
    });
});