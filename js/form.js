document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();  // Evita que el formulario se envíe inmediatamente

    // Limpiar mensajes de error previos
    const errors = document.querySelectorAll(".error");
    errors.forEach(error => error.style.display = "none");

    let isValid = true;

    
    // Validar Nombre
    const name = document.getElementById("name").value.trim();
    if (!name || !/^[A-Za-z\s]+$/.test(name)) {
        document.getElementById("nameError").textContent = "El nombre es obligatorio y solo puede contener letras y espacios";
        document.getElementById("nameError").style.display = "block";
        isValid = false;
    }

    // Validar Correo Electrónico
    const email = document.getElementById("email").value.trim();
    if (!email || !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
        document.getElementById("emailError").textContent = "Por favor, ingresa un correo válido";
        document.getElementById("emailError").style.display = "block";
        isValid = false;
    }

    // Validar Opciones
    const options = document.getElementById("opciones").value;
    if (!options) {
        document.getElementById("optionsError").textContent = "Por favor, selecciona una opción";
        document.getElementById("optionsError").style.display = "block";
        isValid = false;
    }

    // Validar Mensaje
    const message = document.getElementById("message").value.trim();
    if (!message || message.length < 10 || message.length > 100) {
        document.getElementById("messageError").textContent = "El mensaje debe tener al menos 10 caracteres y máximo 100";
        document.getElementById("messageError").style.display = "block";
        isValid = false;
    }

    // Si el formulario es válido, envíalo
    if (isValid) {
        alert("El formulario ha sido enviado correctamente");

        /* Opcional: Limpiar el formulario */
        document.getElementById("contactForm").reset();
        // Consola
        console.log("Form submitted successfully");
        /* Enviar el formulario (es necesario para que la acción de mailto funcione)
        document.getElementById("contactForm").submit();  // Ahora envía el formulario */

        // Llamamos a la función de enviarFormularioContacto() desde contactSend.js
        enviarFormularioContacto(name, email, options, message);
    }

});