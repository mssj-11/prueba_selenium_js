const assert = require("assert");
const { Builder, Browser, By } = require("selenium-webdriver");

describe("Obtener el logo y nombre de la página web", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get("http://127.0.0.1:5500/index.html");
    });

    after(async () => {
        await driver.quit();
    });

    it("Debe obtener el logo de la página web", async () => {
        try {
            await driver.manage().setTimeouts({ implicit: 500 });
            // Esperamos que la imagen con el alt 'FC Barcelona Logo' esté presente
            let logo = await driver.findElement(By.css("img[alt='FC Barcelona Logo']"));
            assert.ok(logo, "El logo no se encontró en la página");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El logo no se encontró en la página");
        }
    });

    it("Debe obtener el nombre de la página web", async () => {
        try {
            // Encontramos el <h1> que contiene el nombre de la empresa
            let nameElement = await driver.findElement(By.css("h1"));
            let nameText = await nameElement.getText();
            
            // Comprobamos que el texto obtenido sea el esperado
            assert.equal(nameText, "FC Barcelona", "El nombre de la página no es el esperado.");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("No se encontró el nombre de la página correctamente");
        }
    });
    
});