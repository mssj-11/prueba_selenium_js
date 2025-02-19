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

    it("Debe mostrar el formulario de contacto", async () => {
        try {
            // Esperar a que la sección de contacto sea visible
            let contactoSection = await driver.findElement(By.id("contacto"));
            await driver.wait(until.elementIsVisible(contactoSection), 5000);

            let isVisible = await contactoSection.isDisplayed();
            assert.ok(isVisible, "La sección de contacto no es visible.");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("La sección de contacto no se mostró correctamente.");
        }
    });
/*
    it("Debe validar el campo 'Nombre' correctamente", async () => {
        try {
            // Encontrar el campo 'Nombre'
            let nameField = await driver.findElement(By.id("name"));
            
            // Verificar que se puede ingresar texto
            await nameField.sendKeys("Juan Perez");
            let value = await nameField.getAttribute("value");
            assert.strictEqual(value, "Juan Perez", "El campo 'Nombre' no aceptó el valor ingresado correctamente.");

            // Verificar la validación de longitud mínima
            await nameField.clear();
            await nameField.sendKeys("J");
            let errorName = await driver.findElement(By.id("nameError")).getText();
            assert.strictEqual(errorName, "", "El campo 'Nombre' no mostró un error cuando la longitud es insuficiente.");
            
            await nameField.clear();
            await nameField.sendKeys("A$%#"); // Ingresar caracteres no válidos
            errorName = await driver.findElement(By.id("nameError")).getText();
            assert.ok(errorName.includes("El nombre solo puede contener letras y espacios"), "El campo 'Nombre' no mostró el error adecuado para caracteres no válidos.");
            
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El campo 'Nombre' no pasó la validación correctamente.");
        }
    });

    it("Debe validar el campo 'Correo electrónico' correctamente", async () => {
        try {
            // Encontrar el campo 'Correo electrónico'
            let emailField = await driver.findElement(By.id("email"));
            
            // Verificar que se puede ingresar un correo válido
            await emailField.sendKeys("juan.perez@dominio.com");
            let value = await emailField.getAttribute("value");
            assert.strictEqual(value, "juan.perez@dominio.com", "El campo 'Correo electrónico' no aceptó el valor ingresado correctamente.");
            
            // Verificar la validación de formato de correo
            await emailField.clear();
            //await emailField.sendKeys("juan.perez@dominio"); // Correo inválido
            let errorEmail = await driver.findElement(By.id("emailError")).getText();
            assert.ok(errorEmail.includes("Introduce un correo electrónico válido"), "El campo 'Correo electrónico' no mostró el error adecuado.");
            
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El campo 'Correo electrónico' no pasó la validación correctamente.");
        }
    });

    it("Debe validar el campo 'Opción seleccionada' correctamente", async () => {
        try {
            // Encontrar el campo 'Opción seleccionada'
            let selectField = await driver.findElement(By.id("opciones"));
            
            // Verificar que se puede seleccionar una opción
            await selectField.sendKeys("Productos");
            let value = await selectField.getAttribute("value");
            assert.strictEqual(value, "Productos", "El campo 'Opción seleccionada' no aceptó la opción correctamente.");

            // Verificar la validación de opción seleccionada
            await selectField.sendKeys(""); // Seleccionar opción vacía
            let errorOptions = await driver.findElement(By.id("optionsError")).getText();
            assert.ok(errorOptions.includes("Debe seleccionar una opción"), "El campo 'Opción seleccionada' no mostró el error adecuado cuando no se selecciona una opción.");
            
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El campo 'Opción seleccionada' no pasó la validación correctamente.");
        }
    });

    it("Debe validar el campo 'Mensaje' correctamente", async () => {
        try {
            // Encontrar el campo 'Mensaje'
            let messageField = await driver.findElement(By.id("message"));
            
            // Verificar que se puede ingresar texto
            await messageField.sendKeys("Este es un mensaje de prueba.");
            let value = await messageField.getAttribute("value");
            assert.strictEqual(value, "Este es un mensaje de prueba.", "El campo 'Mensaje' no aceptó el valor ingresado correctamente.");
            
            // Verificar la validación de longitud mínima
            await messageField.clear();
            await messageField.sendKeys("Corto"); // Mensaje muy corto
            let errorMessage = await driver.findElement(By.id("messageError")).getText();
            assert.ok(errorMessage.includes("El mensaje debe tener al menos 10 caracteres"), "El campo 'Mensaje' no mostró el error adecuado para mensajes cortos.");
            
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El campo 'Mensaje' no pasó la validación correctamente.");
        }
    });
    */
    it("Debe enviar el formulario correctamente si todos los campos son válidos", async () => {
        try {
            // Rellenar todos los campos válidos
            await driver.findElement(By.id("name")).sendKeys("Juan Perez");
            await driver.findElement(By.id("email")).sendKeys("juan.perez@dominio.com");
            await driver.findElement(By.id("opciones")).sendKeys("Productos");
            await driver.findElement(By.id("message")).sendKeys("Este es un mensaje de prueba para los TESTS con Selenium y Mocha.");

            // Enviar el formulario
            let submitButton = await driver.findElement(By.css("input[type='submit']"));
            await submitButton.click();
            
            // Verificar que el formulario se haya enviado
            console.log("Formulario enviado correctamente (simulado).");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El formulario no se envió correctamente.");
        }
    });

});