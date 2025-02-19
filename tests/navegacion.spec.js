const assert = require('assert');
const { Builder, Browser, By, until } = require("selenium-webdriver");

describe ("Pruebas de navegación", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get("http://127.0.0.1:5500/index.html");
    });

    after(async () => {
        await driver.quit();
    });

    it("Debe tener un enlace a 'Inicio'", async () => {
        try {
            await driver.manage().setTimeouts({ implicit: 500 });
    
            // Buscar el enlace con href '#inicio'
            let inicioLink = await driver.findElement(By.css("a[href='#inicio']"));
            
            // Verificar si se encuentra el enlace
            assert.ok(inicioLink, "El enlace a 'Inicio' no se encontró en la página");
    
            // Hacer clic en el enlace y verificar la visibilidad de la sección
            await inicioLink.click();
            let inicioSection = await driver.findElement(By.id("inicio"));
            await driver.wait(until.elementIsVisible(inicioSection), 5000);
            
            let isVisible = await inicioSection.isDisplayed();
            assert.ok(isVisible, "La sección 'Inicio' no es visible después de hacer clic en el enlace");
    
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El enlace a 'Inicio' o la sección no se encontraron correctamente.");
        }
    });
    
    it("Debe de tener un enlace a 'El Equipo'", async () => {
        try {
            await driver.manage().setTimeouts({ implicit: 500 });
            let equipoLink = await driver.findElement(By.css("a[href='#equipo']"));
            assert.ok(equipoLink, "El enlace a 'Inicio' no se encontró en la página");
            await equipoLink.click();
            let equipoSection = await driver.findElement(By.id("equipo"));
            await driver.wait(until.elementIsVisible(equipoSection), 5000);
            let isVisible = await equipoSection.isDisplayed();
            assert.ok(isVisible, "La sección 'El Equipo' no es visible después de hacer clic en el enlace");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El enlace a 'El Equipo' o la sección no se encontraron correctamente.");
        }
    });
    
    it("Debe tener un enlace a 'Partidos'", async () => {
        try {
            await driver.manage().setTimeouts({ implicit: 500 });

            let partidosLink = await driver.findElement(By.css("a[href='#partidos']"));
            assert.ok(partidosLink, "El enlace a 'Partidos' no se encontró en la página");

            await partidosLink.click();
            let partidosSection = await driver.findElement(By.id("partidos"));
            await driver.wait(until.elementIsVisible(partidosSection), 5000);

            let isVisible = await partidosSection.isDisplayed();
            assert.ok(isVisible, "La sección 'Partidos' no es visible después de hacer clic en el enlace");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El enlace a 'Partidos' o la sección no se encontraron correctamente.");
        }
    });

    it("Debe tener un enlace a 'Productos'", async () => {
        try {
            await driver.manage().setTimeouts({ implicit: 500 });

            let productosLink = await driver.findElement(By.css("a[href='#productosTarjetas']"));
            assert.ok(productosLink, "El enlace a 'Productos' no se encontró en la página");

            await productosLink.click();
            let productosSection = await driver.findElement(By.id("productosTarjetas"));
            await driver.wait(until.elementIsVisible(productosSection), 5000);

            let isVisible = await productosSection.isDisplayed();
            assert.ok(isVisible, "La sección 'Productos' no es visible después de hacer clic en el enlace");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El enlace a 'Productos' o la sección no se encontraron correctamente.");
        }
    });

    it("Debe tener un enlace a 'Contacto'", async () => {
        try {
            await driver.manage().setTimeouts({ implicit: 500 });

            let contactoLink = await driver.findElement(By.css("a[href='#contacto']"));
            assert.ok(contactoLink, "El enlace a 'Contacto' no se encontró en la página");

            await contactoLink.click();
            let contactoSection = await driver.findElement(By.id("contacto"));
            await driver.wait(until.elementIsVisible(contactoSection), 5000);

            let isVisible = await contactoSection.isDisplayed();
            assert.ok(isVisible, "La sección 'Contacto' no es visible después de hacer clic en el enlace");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El enlace a 'Contacto' o la sección no se encontraron correctamente.");
        }
    });

    it("Debe tener un enlace a 'Carrito'", async () => {
        try {
            await driver.manage().setTimeouts({ implicit: 500 });

            let carritoLink = await driver.findElement(By.css("a[href='#carrito']"));
            assert.ok(carritoLink, "El enlace a 'Carrito' no se encontró en la página");

            await carritoLink.click();
            let carritoSection = await driver.findElement(By.id("carrito"));
            await driver.wait(until.elementIsVisible(carritoSection), 5000);

            let isVisible = await carritoSection.isDisplayed();
            assert.ok(isVisible, "La sección 'Carrito' no es visible después de hacer clic en el enlace");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El enlace a 'Carrito' o la sección no se encontraron correctamente.");
        }
    });

    it("Debe tener un enlace a 'Login'", async () => {
        try {
            await driver.manage().setTimeouts({ implicit: 500 });

            let loginLink = await driver.findElement(By.css("a[href='admin.html']"));
            assert.ok(loginLink, "El enlace a 'Login' no se encontró en la página");

            await loginLink.click();
            let currentUrl = await driver.getCurrentUrl();
            assert.strictEqual(currentUrl, "http://127.0.0.1:5500/admin.html", "El enlace 'Login' no redirige correctamente.");
        } catch (error) {
            console.error("Error durante la prueba:", error);
            assert.fail("El enlace a 'Login' no se encontró o no redirige correctamente.");
        }
    });

});
