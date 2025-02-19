const assert = require('assert');
const { Builder, Browser, By, until } = require("selenium-webdriver");

describe("Pruebas del carrito", () => {
    let driver;

    before(async () => {
        driver = await new Builder().forBrowser(Browser.FIREFOX).build();
        await driver.get("http://127.0.0.1:5500/index.html");
    });

    after(async () => {
        await driver.quit();
    });

    it("Verificar insertado datos y refrescando la página", async () => {
        // Insertar el dato en localStorage
        const productos = [
            {
                "id": 1,
                "nombreProducto": "Camiseta Barcelona 2025",
                "precio": 1200,
                "descuento": 10,
                "categoria": "Masculino",
                "tallas": {
                    "S": 1,
                    "M": 2,
                    "L": 3,
                    "XL": 4,
                    "XXL": 2
                },
                "imagenes": [
                    "https://resources.claroshop.com/medios-plazavip/t1/1724606628075701djpg",
                    "https://acdn.mitiendanube.com/stores/003/636/118/products/camisa-jersey-shirt-titular-home-i-barcelona-azul-grena-24-25-nike-masculina-torcedor-fan-costa-ad0410f49611427e1517232588465976-1024-1024.png",
                    "https://www.futbolemotion.com/imagesarticulos/264551/grandes/camiseta-nike-fc-barcelona-primera-equipacion-2024-2025-nino-deep-royal-blue-noble-red-midnight-navy-0.webp"
                ],
                "cantidadTotal": 12
            },
            {
                "id": 2,
                "nombreProducto": "Camiseta Barcelona 2025 Femenino",
                "precio": 1200,
                "descuento": 10,
                "categoria": "Femenino",
                "tallas": {
                    "S": 1,
                    "M": 2,
                    "L": 3,
                    "XL": 4,
                    "XXL": 2
                },
                "imagenes": [
                    "https://cdn.grupoelcorteingles.es/SGFM/dctm/MEDIA03/202407/19/00199455130288____2__1200x1200.jpg",
                    "https://www.futbolemotion.com/imagesarticulos/218515/grandes/camiseta-nike-fc-barcelona-primera-equipacion-2024-2025-mujer-deep-royal-blue-noble-red-midnight-navy-7.webp",
                    "https://i8.amplience.net/t/jpl/jdes_product_list?plu=jd_701078_al&qlt=85&qlt=92&w=320&h=320&v=1&fmt=auto"

                ],
                "cantidadTotal": 12
            }
        ];

        await driver.executeScript("localStorage.setItem('productosBarca', JSON.stringify(arguments[0]));", productos);
        
        // Recargar la página para que el localStorage se lea correctamente
        await driver.navigate().refresh();

        // Verificar que el localStorage tiene el dato correcto
        const productosBarca = await driver.executeScript("return localStorage.getItem('productosBarca');");
        const productosParsed = JSON.parse(productosBarca);

        // Verificar si se recupera correctamente el producto
        assert.ok(productosParsed.length > 0, "No se encontró el producto en el localStorage");
        assert.strictEqual(productosParsed[0].nombreProducto, "Camiseta Barcelona 2025", "El producto no es el esperado");
        assert.strictEqual(productosParsed[1].nombreProducto, "Camiseta Barcelona 2025 Femenino", "El producto no es el esperado");
    });


    // Agregar productos al carrito
    it("Agregar productos al carrito y verificar", async () => {
        // Recargar la página para asegurarnos de que los datos se mantengan
        await driver.navigate().refresh();

        // Buscar y hacer clic en el botón "Agregar al carrito" para el primer producto
        const btnAgregar1 = await driver.findElement(By.className('btn-agregar'));
        await btnAgregar1.click();

        // Esperar un momento para que el carrito se actualice en el localStorage
        await driver.sleep(1000);

        // Buscar y hacer clic en el botón "Agregar al carrito" para el segundo producto
        const btnAgregar2 = await driver.findElement(By.xpath("(//button[@class='btn-agregar'])[2]"));
        await btnAgregar2.click();

        // Esperar un momento para que el carrito se actualice en el localStorage
        await driver.sleep(1000);

        // Verificar que los productos han sido añadidos al carrito
        const carrito = await driver.executeScript("return localStorage.getItem('carritoBarca');");
        const carritoParsed = JSON.parse(carrito);

        assert.ok(carritoParsed.length === 2, "El carrito no tiene los productos esperados");
        assert.strictEqual(carritoParsed[0].nombreProducto, "Camiseta Barcelona 2025", "El primer producto en el carrito no es el esperado");
        assert.strictEqual(carritoParsed[1].nombreProducto, "Camiseta Barcelona 2025 Femenino", "El segundo producto en el carrito no es el esperado");
    });

    // Eliminar el segundo producto del carrito
    it("Eliminar segundo producto del carrito y verificar", async () => {
        // 1. Hacer clic en el botón de carrito para abrir el modal
        const cartButton = await driver.findElement(By.className('cart-button')); // Buscar el botón de carrito
        await cartButton.click(); // Hacer clic para abrir el modal del carrito
    
        // Esperar un momento para que el modal se cargue
        await driver.sleep(1000);
    
        // 2. Buscar y hacer clic en el botón de eliminar el segundo producto
        const btnEliminar2 = await driver.findElement(By.xpath("(//button[@id='btnCarritoEliminar'])[2]")); 
        await btnEliminar2.click(); // Eliminar el segundo producto del carrito
    
        // Esperar un momento para que el carrito se actualice en el localStorage
        await driver.sleep(1000);
    
        // 3. Verificar que el carrito tiene solo un producto
        const carrito = await driver.executeScript("return localStorage.getItem('carritoBarca');");
        const carritoParsed = JSON.parse(carrito);
    
        // Comprobar que el carrito tiene un solo producto
        assert.strictEqual(carritoParsed.length, 1, "El carrito no tiene el número esperado de productos");
        assert.strictEqual(carritoParsed[0].nombreProducto, "Camiseta Barcelona 2025", "El producto restante no es el esperado");
    });
    

    // Calcular el total del carrito
    it("Calcular el total del carrito y verificar", async () => {
        // Recargar la página para asegurarnos de que los datos se mantengan
        await driver.navigate().refresh();

        // Asegurarnos de que el producto esté en el carrito
        const carrito = await driver.executeScript("return localStorage.getItem('carritoBarca');");
        const carritoParsed = JSON.parse(carrito);

        // Asegurarnos de que haya un producto en el carrito
        assert.ok(carritoParsed.length > 0, "El carrito está vacío");

        // Calcular el total considerando el precio y el descuento
        const producto = carritoParsed[0];
        const precioConDescuento = producto.precio * (1 - producto.descuento / 100);

        // Verificar que el precio calculado es el esperado
        assert.strictEqual(precioConDescuento, 1080, "El total del carrito es incorrecto");
    });


});