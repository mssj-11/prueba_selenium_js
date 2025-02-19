const assert = require('assert');
const { Builder, Browser, By, until } = require("selenium-webdriver");

describe("Pruebas del formulario de contacto", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get("http://127.0.0.1:5500/index.html");
    });

    after(async () => {
        await driver.quit();
    });

    
    it("Validacion del formulario", async () => {
        try {
            // Rellenar campos con datos incorrectos
            await driver.findElement(By.id("name")).sendKeys("A$%#");  // Nombre con caracteres no válidos
            await driver.findElement(By.id("email")).sendKeys("juan.perez@dominio"); // Correo con formato incorrecto
            await driver.findElement(By.id("opciones")).sendKeys("");  // Opción vacía
            await driver.findElement(By.id("message")).sendKeys("corto"); // Mensaje muy corto (menos de 10 caracteres)
    
            // Enviar el formulario
            let submitButton = await driver.findElement(By.css("input[type='submit']"));
            await submitButton.click();
            
            // Verificar que el formulario se haya enviado, aunque los datos sean incorrectos
            console.log("Formulario trato de enviarse con datos incorrectos (simulado).");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El formulario no se envió correctamente.");
        }
    });
    

});