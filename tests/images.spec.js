const { expect } = require("chai");
const { Builder, Browser, By } = require("selenium-webdriver");

describe("Obtener todas las imágenes", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get("http://127.0.0.1:5500/index.html");
    });

    after(async () => {
        await driver.quit();
    });

    it("Todas las imágenes deben cargarse correctamente", async () => {
        try {
            // Espera implícita para dar tiempo a que las imágenes se carguen
            await driver.manage().setTimeouts({ implicit: 5000 });

            // Obtener todas las imágenes de la página
            let images = await driver.findElements(By.tagName('img'));

            // Iterar sobre todas las imágenes y verificar que el atributo 'src' no esté vacío
            for (let img of images) {
                let src = await img.getAttribute('src');
                expect(src).to.not.be.empty;  // Verifica que el atributo src no esté vacío

                // Verificar si la imagen se ha cargado correctamente (completada)
                let isComplete = await driver.executeScript('return arguments[0].complete;', img);
                expect(isComplete, `La imagen con src ${src} no se cargó correctamente.`).to.be.true;
            }

            // Verificar que se encontraron imágenes
            expect(images.length).to.be.greaterThan(0, "No se encontraron imágenes en la página.");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            throw new Error("Las imágenes no se cargaron correctamente o no se encontraron.");
        }
    });

});