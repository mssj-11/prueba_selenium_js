// Función para cargar el archivo JSON y guardarlo en el localStorage
function cargarProductosDesdeJSON() {
    // Verificar si el localStorage está vacío
    if (!localStorage.getItem("productosBarca") || localStorage.getItem("productosBarca") === "") {
        // Hacer una petición fetch para cargar el archivo productosBarca.json
        fetch("../js/productosBarca.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al cargar el archivo JSON");
                }
                return response.json();  // Parsear el JSON
            })
            .then(data => {
                // Guardar los datos en el localStorage
                localStorage.setItem("productosBarca", JSON.stringify(data));
                console.log("Datos cargados en el localStorage.");
            })
            .catch(error => {
                console.error("Error al cargar los productos:", error);
            });
    } else {
        console.log("Los productos ya están en el localStorage.");
    }
}

// Llamar a la función para verificar e insertar los datos
cargarProductosDesdeJSON();




/* --------------------------------------------
   MODAL
-------------------------------------------- */
// Función para abrir el modal
var modal = document.getElementById("miModal");
var btnAbrir = document.getElementById("abrirModal");
var btnCerrar = document.getElementById("cerrarModal");

btnAbrir.onclick = function() {
    modal.style.display = "block";
}

btnCerrar.onclick = function() {
    modal.style.display = "none";
}

// Cuando el usuario hace clic fuera del modal, se cierra también
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}


/* --------------------------------------------
   TABLE PRODUCTS
-------------------------------------------- */
// Obtener productos del LocalStorage o usar un array vacío si no hay datos previos
function obtenerProductos() {
    const productos = JSON.parse(localStorage.getItem('productosBarca')) || [];
    return productos;
}

// Guardar productos en LocalStorage
function guardarProductos(productos) {
    localStorage.setItem('productosBarca', JSON.stringify(productos)); // Objeto a string
}

// Mostrar productos en la tabla
function mostrarProductosTabla() {
    const productos = obtenerProductos();
    const tableBody = document.querySelector('#tablaProductos tbody');
    tableBody.innerHTML = '';

    productos.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${producto.nombreProducto}</td>
            <td>
                <div class="imagenes-tabla">
                    <img src="${producto.imagenes[0]}" alt="${producto.nombreProducto}" class="imagen-principal">
                    <img src="${producto.imagenes[1]}" alt="${producto.nombreProducto}" class="imagen-secundaria">
                    <img src="${producto.imagenes[2]}" alt="${producto.nombreProducto}" class="imagen-tercera">
                </div>
            </td>
            <td>$${producto.precio}</td>
            <td>${producto.descuento}%</td>
            <td>${producto.categoria}</td>
            <td class="td-tallas">
                <ul class="lista-tallas">
                    <li><span class="size-tallas">S:</span> <span class="valor-talla">${producto.tallas.S}</span></li>
                    <li><span class="size-tallas">M:</span> <span class="valor-talla">${producto.tallas.M}</span></li>
                    <li><span class="size-tallas">L:</span> <span class="valor-talla">${producto.tallas.L}</span></li>
                    <li><span class="size-tallas">XL:</span> <span class="valor-talla">${producto.tallas.XL}</span></li>
                    <li><span class="size-tallas">XXL:</span> <span class="valor-talla">${producto.tallas.XXL}</span></li>
                </ul>
            </td>
            <td>${producto.cantidadTotal}</td>
            <td>
                <button id="btnProductoEditar" onclick="editarProducto(${producto.id})" class="btn-editar">
                    <i class="fa-solid fa-pen"></i>
                </button>
            </td>
            <td>
                <button id="btnProductoEliminar" onclick="eliminarProducto(${producto.id})" class="btn-eliminar">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Crear un nuevo producto
function crearProducto(nombre, precio, descuento, categoria, tallas, imagenes) {
    const productos = obtenerProductos();
    const id = productos.length ? productos[productos.length - 1].id + 1 : 1; // Ultimo producto
    const cantidadTotal = Object.values(tallas).reduce((acc, val) => acc + val, 0); // Calcular cantidad total

    const nuevoProducto = { id, nombreProducto: nombre, precio, descuento, categoria, tallas, imagenes, cantidadTotal };
    productos.push(nuevoProducto);
    guardarProductos(productos);
    mostrarProductosTabla();
}

// Editar un producto existente
function editarProducto(id) {
    const productos = obtenerProductos();
    const producto = productos.find(p => p.id === id); // Busca el producto por id

    if (producto) {
        // Poner los valores actuales en los campos del formulario
        document.getElementById('productoId').value = producto.id;
        document.getElementById('nombreProducto').value = producto.nombreProducto;
        document.getElementById('precio').value = producto.precio;
        document.getElementById('descuento').value = producto.descuento;
        document.getElementById('opciones').value = producto.categoria;

        // Asignar tallas
        document.getElementById('tallaS').value = producto.tallas.S;
        document.getElementById('tallaM').value = producto.tallas.M;
        document.getElementById('tallaL').value = producto.tallas.L;
        document.getElementById('tallaXL').value = producto.tallas.XL;
        document.getElementById('tallaXXL').value = producto.tallas.XXL;

        // Asignar imágenes
        document.getElementById('imagenProducto').value = producto.imagenes[0];
        document.getElementById('imagenProductoSecundaria').value = producto.imagenes[1];
        document.getElementById('imagenProductoTres').value = producto.imagenes[2];

        // Mostrar el modal
        modal.style.display = "block";
    }
}

// Actualizar un producto
function actualizarProducto(id, nombre, precio, descuento, categoria, tallas, imagenes) {
    const productos = obtenerProductos();
    const indice = productos.findIndex(p => p.id === parseInt(id)); // índice del producto dentro del array 

    if (indice !== -1) {
        const cantidadTotal = Object.values(tallas).reduce((acc, val) => acc + val, 0); // Calcular cantidad total
        productos[indice] = { id: parseInt(id), nombreProducto: nombre, precio, descuento, categoria, tallas, imagenes, cantidadTotal };
        guardarProductos(productos);
        mostrarProductosTabla();
    }
}

// Eliminar un producto
function eliminarProducto(id) {
    const productos = obtenerProductos();
    const productosFiltrados = productos.filter(p => p.id !== id); // crea un nuevo array sin el producto eliminado
    guardarProductos(productosFiltrados);
    mostrarProductosTabla();
}

// Manejo del formulario para agregar/editar productos
document.querySelector('#formProducto').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.querySelector('#productoId').value;
    const nombre = document.querySelector('#nombreProducto').value;
    const precio = parseFloat(document.querySelector('#precio').value);
    const descuento = parseFloat(document.querySelector('#descuento').value);
    const categoria = document.querySelector('#opciones').value;

    const tallas = {
        S: parseInt(document.querySelector('#tallaS').value) || 0,
        M: parseInt(document.querySelector('#tallaM').value) || 0,
        L: parseInt(document.querySelector('#tallaL').value) || 0,
        XL: parseInt(document.querySelector('#tallaXL').value) || 0,
        XXL: parseInt(document.querySelector('#tallaXXL').value) || 0
    };

    const imagenes = [
        document.querySelector('#imagenProducto').value,
        document.querySelector('#imagenProductoSecundaria').value,
        document.querySelector('#imagenProductoTres').value
    ];

    if (id) {
        actualizarProducto(id, nombre, precio, descuento, categoria, tallas, imagenes);
    } else {
        crearProducto(nombre, precio, descuento, categoria, tallas, imagenes);
    }

    // Resetear el formulario y cerrar el modal
    document.querySelector('#formProducto').reset();
    document.querySelector('#productoId').value = '';
    modal.style.display = "none";
});



/* --------------------------------------------
   CARD PRODUCTS
-------------------------------------------- */
// Mostrar productos en formato tarjeta
function mostrarProductosTarjetas() {
    const productos = obtenerProductos(); // Obtener los productos desde localStorage
    const container = document.getElementById('tarjetasContainer');
    container.innerHTML = ''; // Limpiar las tarjetas existentes

    productos.forEach(producto => {
        const tarjeta = document.createElement('div');
        tarjeta.classList.add('tarjeta');
        tarjeta.innerHTML = `
            <img src="${producto.imagenes[0]}" alt="${producto.nombreProducto}">
            <h3>${producto.nombreProducto}</h3>
            <p>Categoria: ${producto.categoria}</p>
            <p class="precio">$${producto.precio}</p>
            <button class="btn-agregar" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        container.appendChild(tarjeta);
    });
}



/* --------------------------------------------
   ORDENAMIENTO FUNCTIONS
-------------------------------------------- */
// Ordenar productos por precio (ascendente o descendente)
function ordenarPorPrecio(orden) {
    const productos = obtenerProductos();

    if (orden === 'asc') {
        productos.sort((a, b) => b.precio - a.precio);
    } else if (orden === 'desc') {
        productos.sort((a, b) => a.precio - b.precio);
    }

    guardarProductos(productos);
    mostrarProductosTabla();
    mostrarProductosTarjetas();
}

// Ordenar productos por nombre (alfabético)
function ordenarPorNombre(orden) {
    const productos = obtenerProductos(); // Obtener los productos desde localStorage
    productos.sort((a, b) => {
        if (orden === 'asc') {
            return a.nombreProducto.localeCompare(b.nombreProducto);
        } else {
            return b.nombreProducto.localeCompare(a.nombreProducto);
        }
    });
    guardarProductos(productos);
    mostrarProductosTabla();
    mostrarProductosTarjetas(); // Vuelve a mostrar los productos ordenados
}



function ordenarPorDescuento(orden) {
    const productos = obtenerProductos();

    if (orden === 'asc') {
        productos.sort((a, b) => b.descuento - a.descuento);
    } else if (orden === 'desc') {
        productos.sort((a, b) => a.descuento - b.descuento);
    }

    guardarProductos(productos);
    mostrarProductosTabla();
    mostrarProductosTarjetas();
}



/* --------------------------------------------
   CART SHOOPING
-------------------------------------------- */
// Agregar al carrito
function agregarAlCarrito(productoId) {
    const productos = obtenerProductos(); // Obtener productos desde LocalStorage
    const producto = productos.find(p => p.id === productoId); // Buscar el producto seleccionado
    let carrito = JSON.parse(localStorage.getItem('carritoBarca')) || []; // Cambié 'carrito' por 'carritoBarca'

    // Verificar si el producto ya está en el carrito
    const index = carrito.findIndex(p => p.id === productoId);
    if (index !== -1) {
        // Si el producto ya está, incrementar la cantidad
        carrito[index].cantidad++;
    } else {
        // Si no está, agregarlo al carrito
        carrito.push({...producto, cantidad: 1});
    }

    // Guardar el carrito actualizado en localStorage
    localStorage.setItem('carritoBarca', JSON.stringify(carrito)); // Cambié 'carrito' por 'carritoBarca'
    mostrarCarrito(); // Actualizar la vista del carrito
}


// Mostrar productos en el carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carritoBarca')) || []; // Cambié 'carrito' por 'carritoBarca'
    const listaCarrito = document.getElementById('listaCarrito');
    const totalCarrito = document.getElementById('totalCarrito');
    
    listaCarrito.innerHTML = ''; // Limpiar lista antes de mostrar
    let total = 0;

    carrito.forEach(item => {
        const itemCarrito = document.createElement('li');
        itemCarrito.innerHTML = `${item.nombreProducto} x${item.cantidad} - $${(item.precio * item.cantidad).toFixed(2)}
        <button onclick="eliminarDelCarrito(${item.id})">Eliminar</button>`;
        listaCarrito.appendChild(itemCarrito);
        total += item.precio * item.cantidad;
    });

    totalCarrito.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Eliminar un producto del carrito
function eliminarDelCarrito(productoId) {
    let carrito = JSON.parse(localStorage.getItem('carritoBarca')) || []; // Cambié 'carrito' por 'carritoBarca'
    carrito = carrito.filter(item => item.id !== productoId); // Filtramos el carrito para eliminar el producto
    localStorage.setItem('carritoBarca', JSON.stringify(carrito)); // Cambié 'carrito' por 'carritoBarca'
    mostrarCarrito(); // Actualizamos la vista del carrito
}

// Vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carritoBarca'); // Cambié 'carrito' por 'carritoBarca'
    mostrarCarrito(); // Actualizamos la vista del carrito
}



// Realizar la compra
function realizarCompra() {
    let carrito = JSON.parse(localStorage.getItem('carritoBarca')) || []; // Cambié 'carrito' por 'carritoBarca'
    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    // Aquí podrías agregar el código para procesar el pago (por ejemplo, con una API de pago)
    alert("Compra realizada con éxito!");
    localStorage.removeItem('carritoBarca'); // Limpiar el carrito después de la compra
    mostrarCarrito(); // Actualizamos la vista del carrito
}




// Cargar los productos en la tabla al iniciar la página
mostrarProductosTabla();
mostrarProductosTarjetas();







// Llamar a la función para mostrar los productos cuando la página haya cargado
window.addEventListener("DOMContentLoaded", function() {
    mostrarProductosTarjetas();
});