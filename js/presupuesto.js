/* =========================================
   OBJETO DE PRECIOS
========================================= */

const precios = {
    tecnica: {
      lapiz: 50,
      acuarela: 80,
      oleo: 120
    },
    tamaño: {
      pequeno: 1,
      mediano: 1.5,
      grande: 2
    },
    enmarcado: {
      pequeno: 20,
      mediano: 35,
      grande: 50
    }
  };
  
  
  /* =========================================
     VALIDACIÓN DE CAMPOS
  ========================================= */
  
  // Función genérica para validar inputs
  function validarCampo(input, regex) {
  
    if (regex.test(input.value)) {
      input.classList.remove("invalido");
      input.classList.add("valido");
      return true;
    } else {
      input.classList.remove("valido");
      input.classList.add("invalido");
      return false;
    }
  
  }
  
  // Expresiones regulares
  const regexNombre = /^[A-Za-z]{1,15}$/;
  const regexApellidos = /^[A-Za-z\s]{1,40}$/;
  const regexTelefono = /^[0-9]{9}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  
  /* =========================================
     ACTUALIZAR PRECIO DEL MARCO
  ========================================= */
  
  function actualizarMarco() {
  
    const tamaño = document.getElementById("tamano").value;
  
    document.getElementById("precioMarco").textContent =
      precios.enmarcado[tamaño];
  }
  
  
  /* =========================================
     CALCULAR DESCUENTO / RECARGO
  ========================================= */
  
  function calcularAjuste(dias) {
  
    if (dias > 30) return -0.1;  // descuento 10%
    if (dias < 7) return 0.2;    // recargo 20%
  
    return 0;
  }
  
  
  /* =========================================
     CALCULAR PRECIO TOTAL
  ========================================= */
  
  function calcularPrecio() {
  
    const tecnica = document.getElementById("tecnica").value;
    const tamaño = document.getElementById("tamano").value;
    const enmarcado = document.getElementById("enmarcado").checked;
    const dias = parseInt(document.getElementById("plazo").value);
  
    let precio = precios.tecnica[tecnica];
  
    // multiplicador por tamaño
    precio *= precios.tamaño[tamaño];
  
    // añadir enmarcado
    if (enmarcado) {
      precio += precios.enmarcado[tamaño];
    }
  
    // extras
    const extras = document.querySelectorAll(".extra:checked");
    extras.forEach(extra => {
      precio += parseInt(extra.value);
    });
  
    // descuento / recargo
    const ajuste = calcularAjuste(dias);
    precio += precio * ajuste;
  
    // mostrar resultado
    document.getElementById("resultado").textContent =
      "Precio: " + precio.toFixed(2) + " €";
  }
  
  
  /* =========================================
     EVENTOS DE VALIDACIÓN EN TIEMPO REAL
  ========================================= */
  
  const nombre = document.getElementById("nombre");
  const apellidos = document.getElementById("apellidos");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");
  
  nombre.addEventListener("input", () => {
    validarCampo(nombre, regexNombre);
  });
  
  apellidos.addEventListener("input", () => {
    validarCampo(apellidos, regexApellidos);
  });
  
  telefono.addEventListener("input", () => {
    validarCampo(telefono, regexTelefono);
  });
  
  email.addEventListener("input", () => {
    validarCampo(email, regexEmail);
  });
  
  
  /* =========================================
     EVENTOS DE CAMBIO (CÁLCULO AUTOMÁTICO)
  ========================================= */
  
  document.querySelectorAll("select, input").forEach(el => {
  
    el.addEventListener("change", () => {
      actualizarMarco();
      calcularPrecio();
    });
  
  });
  
  
  /* =========================================
     VALIDACIÓN FINAL AL ENVIAR
  ========================================= */
  
  document.getElementById("formPresupuesto").addEventListener("submit", function(e) {

  
    let esValido = true;
  
    const nombre = document.getElementById("nombre");
    const apellidos = document.getElementById("apellidos");
    const telefono = document.getElementById("telefono");
    const email = document.getElementById("email");
  
    if (!validarCampo(nombre, regexNombre)) {
      esValido = false;
    }
  
    if (!validarCampo(apellidos, regexApellidos)) {
      esValido = false;
    }
  
    if (!validarCampo(telefono, regexTelefono)) {
      esValido = false;
    }
  
    if (!validarCampo(email, regexEmail)) {
      esValido = false;
    }
  
    if (!esValido) {
      e.preventDefault();
      alert("Revisa los campos del formulario");
    }
  
  });
  
  
  /* =========================================
     RESET DEL FORMULARIO
  ========================================= */
  
  document.getElementById("formPresupuesto").addEventListener("reset", () => {
  
    setTimeout(() => {
  
      // limpiar clases visuales
      document.querySelectorAll("input").forEach(input => {
        input.classList.remove("valido", "invalido");
      });
  
      // reset precio
      document.getElementById("resultado").textContent = "Precio: 0 €";
  
      // reset precio marco
      actualizarMarco();
  
    }, 0);
  
  });