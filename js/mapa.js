/** CREAR MAPA **/ 

const mapa = L.map('mapa').setView([38.5370, -0.8185], 15);


/** CREAR CAPA **/

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {

    attribution: '&copy; OpenStreetMap contributors'

}).addTo(mapa);


/** MARCADOR  **/

L.marker([38.5370, -0.8185])

    .addTo(mapa)

    .bindPopup("Atelier Retratos<br>Calle Valencia 3, Sax, Alicante")

    .openPopup();

/** GEOLOCALIZACIÓN **/

if (navigator.geolocation) {

    navigator.geolocation.getCurrentPosition(

        // ÉXITO
        function(posicion) {

            const latUsuario = posicion.coords.latitude;
            const lngUsuario = posicion.coords.longitude;

            console.log(latUsuario, lngUsuario);

            // Ruta
            L.Routing.control({

                waypoints: [

                    L.latLng(latUsuario, lngUsuario),
                    L.latLng(38.5370, -0.8185)

                ],

                routeWhileDragging: false

            }).addTo(mapa);

        },

        // ERROR
        function(error) {

            console.log(error);

            alert("No se pudo obtener tu ubicación.");

        }

    );

} else {

    alert("Tu navegador no soporta geolocalización.");

}


/** REPARAR RENDER **/

setTimeout(() => {

    mapa.invalidateSize();

}, 300);





/******   Validacion de Formulario de pagina de contacto******/


const form = document.getElementById("formContacto");

const nombre = document.getElementById("nombreContacto");
const email = document.getElementById("emailContacto");
const mensaje = document.getElementById("mensajeContacto");


/* Expresiones regulares */

const regexNombre = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]{2,30}$/;
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


/** VALIDAR CAMPO **/

function validarCampo(input, regex) {

    if (input.value.trim() === "") {

        input.classList.remove("valido", "invalido");

        return false;
    }

    if (regex.test(input.value)) {

        input.classList.add("valido");
        input.classList.remove("invalido");

        return true;

    } else {

        input.classList.add("invalido");
        input.classList.remove("valido");

        return false;
    }

}


/** EVENTOS **/

nombre.addEventListener("input", () => {

    validarCampo(nombre, regexNombre);

});

email.addEventListener("input", () => {

    validarCampo(email, regexEmail);

});

/** VALIDAR MENSAJE **/

mensaje.addEventListener("input", () => {

    if (mensaje.value.trim().length >= 10) {

        mensaje.classList.add("valido");
        mensaje.classList.remove("invalido");

    } else {

        mensaje.classList.add("invalido");
        mensaje.classList.remove("valido");

    }

});


/** SUBMIT **/

form.addEventListener("submit", function(e) {

    // detener SIEMPRE el envío
    e.preventDefault();


    const nombreValido =
        validarCampo(nombre, regexNombre);

    const emailValido =
        validarCampo(email, regexEmail);

    const mensajeValido =
        mensaje.value.trim().length >= 10;


    if (mensajeValido) {

        mensaje.classList.add("valido");
        mensaje.classList.remove("invalido");

    } else {

        mensaje.classList.add("invalido");
        mensaje.classList.remove("valido");

    }


    /** VALIDACION FINAL **/

    if (nombreValido && emailValido && mensajeValido) {

        alert("Mensaje enviado correctamente");

        form.reset();

        document.querySelectorAll("input, textarea")
            .forEach(campo => {

                campo.classList.remove("valido", "invalido");

            });

    } else {

        alert("Revisa los campos del formulario");

    }

});