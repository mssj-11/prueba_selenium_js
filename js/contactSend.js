// Función para enviar el formulario a través de EmailJS
function enviarFormularioContacto(nombre, email, opciones, mensaje) {
    emailjs.send("service_h61ayp5", "template_qvn342x", {
        nombre: nombre,
        email: email,
        opciones: opciones,
        mensaje: mensaje
    }).then(function(response) {
        console.log("Formulario enviado exitosamente", response);
        alert("El formulario ha sido enviado correctamente");
    }, function(error) {
        console.error("Error al enviar el formulario", error);
        alert("Hubo un problema al enviar el formulario. Por favor, intenta de nuevo.");
    });
}