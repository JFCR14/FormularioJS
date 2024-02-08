document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formRegistro");
    const pasos = document.querySelectorAll(".paso");
    const botonesSiguiente = document.querySelectorAll(".btn-siguiente");
    const progressBar = document.querySelector(".progress-bar");
    const botonesAnterior = document.querySelectorAll(".btn-anterior");
    let pasoActual = 1;

    function actualizarBarraDeProgreso() {
        const progreso = ((pasoActual - 1) / (pasos.length - 1)) * 100;
        progressBar.style = `width: ${progreso}%`;
    }

    function siguientePaso() {
        // Validar campos antes de pasar al siguiente paso
        if (validarCampos()) {
            pasos[pasoActual - 1].style.display = "none";
            pasoActual++;
            if (pasoActual > pasos.length) {
                // Mostrar mensaje de gracias en lugar de avanzar al siguiente paso
                document.getElementById("mensajeGracias").style.display = "block";
                formulario.style.display = "none"; // Ocultar formulario
                return; // Salir de la función
            }
            pasos[pasoActual - 1].style.display = "block";
            actualizarBarraDeProgreso();
        }
    }

    function pasoAnterior() {
        pasos[pasoActual - 1].style.display = "none";
        pasoActual--;
        if (pasoActual < 1) {
            pasoActual = 1;
        }
        pasos[pasoActual - 1].style.display = "block";
        actualizarBarraDeProgreso();
    }

    function validarCampos() {
        const camposPaso = pasos[pasoActual - 1].querySelectorAll("input, select, textarea");
        for (const campo of camposPaso) {
            // Validar solo campos que están visibles
            if (campo.offsetParent !== null) {
                // Verificar si el campo está vacío
                if (campo.value.trim() === "") {
                    alert(`Por favor, complete el campo ${campo.name}.`);
                    return false;
                }

                // Validar correo electrónico
                if (campo.id === "correo") {
                    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!regexCorreo.test(campo.value.trim())) {
                        alert("Por favor, ingrese un correo electrónico válido.");
                        return false;
                    }
                }

                // Validar fecha de nacimiento
                if (campo.id === "fechaNacimiento") {
                    const regexFecha = /^\d{2}\/\d{2}\/\d{4}$/;
                    if (!regexFecha.test(campo.value.trim())) {
                        alert("Por favor, ingrese una fecha de nacimiento válida en el formato dd/mm/aaaa.");
                        return false;
                    }
                }

                // Validar DNI
                if (campo.id === "dni") {
                    const regexDNI = /^\d{8}[a-zA-Z]$/;
                    if (!regexDNI.test(campo.value.trim())) {
                        alert("Por favor, ingrese un DNI válido (8 dígitos seguidos de una letra).");
                        return false;
                    }
                }
            }
        }
        return true;
    }

    botonesSiguiente.forEach((boton) => {
        boton.addEventListener("click", siguientePaso);
    });

    botonesAnterior.forEach((boton) => {
        boton.addEventListener("click", pasoAnterior);
    });
});
