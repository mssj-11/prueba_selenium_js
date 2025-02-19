const { expect } = require("chai");
const { getDriver } = require("./testConfig");
const HomePage = require("./pages/homePage");

describe("Test de la barra de navegación", function () {
    let driver;
    let homePage;

    before(async function () {
        driver = await getDriver();
        homePage = new HomePage(driver);
    });

    after(async function () {
        await driver.quit();
    });

    it("Debe mostrar correctamente los elementos del menú", async function () {
        await homePage.open();
        let links = await homePage.getNavLinks();

        links = links.map(link => link.toLowerCase());
        let expectedLinks = ["inicio", "el equipo", "partidos", "productos", "contacto", "login"];
        
        expect(links).to.include.members(expectedLinks);
    });
});