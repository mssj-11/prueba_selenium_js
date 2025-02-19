/* --------------------------------------------
   CARD PRODUCTS
-------------------------------------------- */
// Función para obtener productos desde localStorage
function obtenerProductos() {
  return JSON.parse(localStorage.getItem("productosBarca")) || [];
}

// Función para mostrar los productos en formato tarjeta
function mostrarProductosTarjetas() {
  const productos = obtenerProductos();
  const container = document.getElementById("tarjetasContainer");
  container.innerHTML = "";

  // Si no hay productos, muestra un mensaje
  if (productos.length === 0) {
    container.innerHTML = "<p>No hay productos disponibles.</p>";
    return;
  }

  // Generar las tarjetas para cada producto
  productos.forEach((producto) => {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("tarjeta");
    tarjeta.innerHTML = `
            <div class="producto-imagen-container">
                <img src="${producto.imagenes[0]}" alt="${producto.nombreProducto}" class="producto-imagen producto-imagen-principal">
                <img src="${producto.imagenes[1]}" alt="${producto.nombreProducto}" class="producto-imagen producto-imagen-secundaria">
            </div><!--
            <img src="${producto.imagenes[0]}" alt="${producto.nombreProducto}">-->
            <h3>${producto.nombreProducto}</h3>
            <p>Categoria: ${producto.categoria}</p>
            <p>Disponibles: ${producto.cantidadTotal}</p>
            <p class="precio">$${producto.precio} MXN</p>
            <button class="btn-agregar" onclick="agregarACarrito(${producto.id})"><i class="fa-solid fa-cart-plus"></i> Agregar al carrito</button>
            <br/>
        `;
    container.appendChild(tarjeta);
  });
}

/* --------------------------------------------
   CART SHOOPING
-------------------------------------------- */
let carrito = obtenerCarrito();

function obtenerCarrito() {
  const carritoGuardado =
    JSON.parse(localStorage.getItem("carritoBarca")) || [];
  return carritoGuardado;
}

function guardarCarrito() {
  localStorage.setItem("carritoBarca", JSON.stringify(carrito));
}

function agregarACarrito(id) {
  const productos = obtenerProductos();
  const producto = productos.find((p) => p.id === id); // Buscar el producto seleccionado por ID

  if (producto) {
    const productoEnCarrito = carrito.find((item) => item.id === producto.id);

    if (productoEnCarrito) {
      // Si el producto ya está en el carrito, incrementamos la cantidad
      if (productoEnCarrito.cantidadCarrito < producto.cantidadTotal) {
        productoEnCarrito.cantidadCarrito++;
      } else {
        alert(
          "No puedes agregar más productos al carrito. Ya no hay suficiente cantidad."
        );
      }
    } else {
      // Si el producto no está en el carrito, lo agregamos
      carrito.push({ ...producto, cantidadCarrito: 1 });
    }
    guardarCarrito(); // Guardar el carrito en LocalStorage
    mostrarCarrito();
    // Actualizar el número en el botón del carrito
    actualizarNumeroCarrito();
  }
}

function mostrarCarrito() {
  const carritoContenedor = document.getElementById("carritoContainer");
  carritoContenedor.innerHTML = "";

  // Verificar si el carrito está vacío después de la compra
  let carrito = JSON.parse(localStorage.getItem("carritoBarca")) || [];

  if (carrito.length === 0) {
    carritoContenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  let total = 0;
  let descuentoTotal = 0;

  // Crear tabla
  const tablaCarrito = document.createElement("table");
  tablaCarrito.innerHTML = `
        <thead>
            <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Descuento</th>
                <th>Precio Final</th>
                <th>Cantidad</th>
                <th>Agregar/Quitar</th>
                <th>Eliminar</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;
  const tableBody = tablaCarrito.querySelector("tbody");

  carrito.forEach((producto, index) => {
    const descuentoAplicado = producto.precio * (producto.descuento / 100); // Calcula el descuento
    const precioFinal = producto.precio - descuentoAplicado; // Calcula el precio final
    const precioTotalProducto = precioFinal * producto.cantidadCarrito; // Calcula el precio total

    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src="${producto.imagenes[0]}" alt="${
      producto.nombre
    }" class="carrito-imagen"></td>
            <td>${producto.nombreProducto}</td>
            <td>$${producto.precio}</td>
            <td>$${descuentoAplicado.toFixed(2)}</td>
            <td>$${precioTotalProducto.toFixed(2)}</td>
            <td>${producto.cantidadCarrito}</td>
            <td>
                <button onclick="decrementarCantidad(${index})"><i class="fa-solid fa-minus"></i></button>
                <button onclick="incrementarCantidad(${index})"><i class="fa-solid fa-plus"></i></button>
            </td>
            <td>
                <button id="btnCarritoEliminar" onclick="eliminarDelCarrito(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        `;
    tableBody.appendChild(row);

    descuentoTotal += descuentoAplicado * producto.cantidadCarrito; // Calcula el descuento aplicado por producto
    total += precioFinal * producto.cantidadCarrito; // Calcula el costo total del producto
  });

  // Crea un contenedor para realizar el scroll horizontal de la tabla
  const tablaContainer = document.createElement("div");
  tablaContainer.classList.add("tabla-scroll-container");
  tablaContainer.appendChild(tablaCarrito);

  // Mostrar la tabla y los totales
  carritoContenedor.appendChild(tablaContainer);

  carritoContenedor.innerHTML += `
        <p id="totalDescuento">Descuento Total:
          <strong> $${descuentoTotal.toFixed(2).toLocaleString("es-MX")}</strong>
        </p>
        <p id="totalCarrito">Total:
          <strong> $${total.toFixed(2).toLocaleString("es-MX")}</strong>
        </p>
        <button id="vaciarCarrito" onclick="vaciarCarrito()">
          <i class="fa-solid fa-trash-can"></i> Vaciar Carrito
        </button> <!-- Botón para vaciar carrito -->
        <button id="continuarCompra" onclick="continuarCompra()">
            <i class="fa-solid fa-chevron-right"></i> Continuar con la compra
        </button>
  `;
  // Actualizar el número en el botón del carrito
  actualizarNumeroCarrito();
}

// Función para actualizar el carrito con los productos modificados o eliminados
function actualizarCarritoConProductosActualizados() {
  carrito = carrito.filter((item) => {
    const producto = obtenerProductos().find((p) => p.id === item.id);
    return producto; // Solo mantener los productos que siguen en el inventario
  });

  carrito.forEach((item) => {
    const producto = obtenerProductos().find((p) => p.id === item.id);
    if (producto) {
      // Si el producto ha sido modificado, actualizamos la información en el carrito
      item.imagenProducto = producto.imagenProducto;
      item.nombre = producto.nombre;
      item.precio = producto.precio;
      item.descuento = producto.descuento;
      item.cantidad = producto.cantidad;
    }
  });

  guardarCarrito();
  mostrarCarrito();
}

// Incrementar cantidad de producto en el carrito
function incrementarCantidad(index) {
  const producto = carrito[index];
  const productoDisponible = obtenerProductos().find(
    (p) => p.id === producto.id
  );

  // Validar que no se exceda la cantidad disponible
  const cantidadEnCarrito = carrito
    .filter((item) => item.id === producto.id)
    .reduce((acc, item) => acc + item.cantidadCarrito, 0);
  if (cantidadEnCarrito < productoDisponible.cantidadTotal) {
    carrito[index].cantidadCarrito++;
    guardarCarrito();
    mostrarCarrito();
    // Actualizar el número en el botón del carrito
    actualizarNumeroCarrito();
  } else {
    alert("No puedes agregar más productos. Ya no hay suficiente cantidad.");
  }
}

// Decrementar cantidad de producto en el carrito
function decrementarCantidad(index) {
  if (carrito[index].cantidadCarrito > 1) {
    carrito[index].cantidadCarrito--;
    guardarCarrito();
    mostrarCarrito();
    // Actualizar el número en el botón del carrito
    actualizarNumeroCarrito();
  }
}

// Eliminar un producto del carrito
function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  guardarCarrito();
  mostrarCarrito();
  // Actualizar el número en el botón del carrito
  actualizarNumeroCarrito();
}

// Vaciar el carrito
function vaciarCarrito() {
  localStorage.removeItem("carritoBarca");
  mostrarCarrito(); // Actualizamos la vista del carrito
  actualizarNumeroCarrito(); // Actualizamos el número en el ícono del carrito
}


//  Actualizar cantidad de productos BTN carrito
function actualizarNumeroCarrito() {
  const carrito = obtenerCarrito();
  const numeroCarrito = document.getElementById("numeroCarrito");

  // Calcular el total de productos en el carrito
  const cantidadProductos = carrito.reduce((total, producto) => total + producto.cantidadCarrito, 0);

  if (cantidadProductos > 0) {
    numeroCarrito.textContent = cantidadProductos; // Mostrar cantidad de productos
    numeroCarrito.style.display = "inline-block"; // Hacer visible el número
  } else {
    numeroCarrito.style.display = "none"; // Ocultar el número si no hay productos
  }
}

/* --------------------------------------------
   * MODALES DE CARRITO DE COMPRA *
-------------------------------------------- */
// Obtener los elementos
const cartButton = document.querySelector('.cart-button'); // El botón del carrito
const modal = document.getElementById('carrito'); // El modal (sección #carrito)
const closeButton = document.querySelector('.close'); // El botón de cierre dentro del modal

// Función para abrir el modal
cartButton.addEventListener('click', (event) => {
  event.preventDefault(); // Evitar que el enlace haga su acción predeterminada
  modal.style.display = 'block'; // Mostrar el modal
});

// Función para cerrar el modal
closeButton.addEventListener('click', () => {
  modal.style.display = 'none'; // Ocultar el modal
});

// Cerrar el modal si se hace clic fuera del contenido del modal
window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none'; // Ocultar el modal si se hace clic fuera
  }
});


/* --------------------------------------------
   * MODALES DE CONFIRMACION DE COMPRA *
-------------------------------------------- */
// Mostrar el modal para completar la compra
function continuarCompra() {
  const modal = document.getElementById("modalConfirmacion");
  modal.style.display = "flex"; // Mostrar modal de formulario
}

// Cerrar el modal
function cerrarModal() {
  const modal = document.getElementById("modalConfirmacion");
  modal.style.display = "none";
}

// Acción de cancelar la compra
document
  .getElementById("cancelarCompra")
  .addEventListener("click", function () {
    cerrarModal(); // Cerrar el modal sin realizar ninguna acción
  });

// Manejar el envío del formulario
document
  .getElementById("formularioCompra")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío tradicional del formulario
    console.log("Formulario enviado");

    // Obtener los datos del formulario
    const nombre = document.getElementById("nombreCliente").value;
    const telefono = document.getElementById("telefonoCliente").value;
    const correo = document.getElementById("correoCliente").value;

    // Obtener los datos del carrito
    let carrito = JSON.parse(localStorage.getItem("carritoBarca")) || [];
    let carritoDetalles = carrito.map((producto) => {
      const descuentoAplicado = producto.precio * (producto.descuento / 100);
      const precioFinal = producto.precio - descuentoAplicado;
      return {
        nombre: producto.nombreProducto,
        cantidad: producto.cantidadCarrito,
        precio: producto.precio,
        precioFinal: precioFinal.toFixed(2),
      };
    });
    console.log("Carrito Detalles:", carritoDetalles);

    // Enviar correo con los detalles de la compra usando EmailJS
    emailjs
      .send("service_nlcjj32", "template_o7d4vc1", {
        nombreCliente: nombre,
        telefonoCliente: telefono,
        correoCliente: correo,
        carritoDetalles: JSON.stringify(carritoDetalles), // Carrito convertido a string
        fechaCompra: new Date().toLocaleString(), // Fecha de compra
        subject: `Confirmación de compra de ${nombre}`, // Aquí personalizas el asunto
      })
      .then(function (response) {
        console.log("Correo enviado exitosamente:", response);

        /// Si el correo se envió correctamente, borramos el carrito
        if (response.status === 200) {
          localStorage.removeItem("carritoBarca"); // Borra el carrito de localStorage
          carrito = []; // Limpiar la variable en memoria del carrito
          mostrarCarrito(); // Actualiza la vista del carrito (que ahora debería estar vacío)
          mostrarMensajeExito(); // Mostrar mensaje de éxito
          cerrarModal(); // Cerrar el modal después de la compra
        }
      })
      .catch(function (error) {
        console.error("Error al enviar correo:", error);
        alert("Hubo un problema al enviar el correo. Intenta nuevamente.");
      });
  });

// Mostrar mensaje de éxito después de la compra
function mostrarMensajeExito() {
  const mensajeExito = document.createElement("div");
  mensajeExito.id = "mensajeCompraExito";
  mensajeExito.innerHTML = `<p>Tu compra se ha realizado con éxito! <i class="fa-solid fa-check"></i></p>`;
   // Borra el carrito de localStorage
  localStorage.removeItem("carritoBarca");
  carrito = [];

  // Añadir el mensaje al contenedor correcto
  document.getElementById("carritoContainer").appendChild(mensajeExito);

  // Mostrar mensaje de éxito por 3 segundos
  setTimeout(() => {
    mensajeExito.style.display = "none";
  }, 3000);
}

// Llamar a la función para mostrar los productos cuando la página haya cargado
window.addEventListener("DOMContentLoaded", function () {
  mostrarProductosTarjetas();
  mostrarCarrito();
});