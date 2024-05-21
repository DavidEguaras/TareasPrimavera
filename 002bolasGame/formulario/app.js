// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene referencias a los elementos del formulario por su ID
    const form = document.getElementById('registroForm'); // Formulario de registro
    const dniInput = document.getElementById('dni'); // Campo de entrada para el DNI
    const dniError = document.getElementById('dniError'); // Elemento para mostrar errores del DNI
    const fechaNacimientoInput = document.getElementById('fechaNacimiento'); // Campo de entrada para la fecha de nacimiento
    const fechaNacimientoError = document.getElementById('fechaNacimientoError'); // Elemento para mostrar errores de la fecha de nacimiento
    const emailInput = document.getElementById('email'); // Campo de entrada para el correo electrónico
    const emailError = document.getElementById('emailError'); // Elemento para mostrar errores del correo electrónico
    const passwordInput = document.getElementById('password'); // Campo de entrada para la contraseña

    // EventListener para el evento de envío del formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe
        // Si el formulario es válido
        if (validateForm()) {
            // Crea un objeto alumno con la información del formulario
            const alumno = {
                matricula: null, // No se especifica la matrícula aquí
                grupo: document.getElementById('grupo').value, // Obtiene el valor del campo 'grupo'
                dni: dniInput.value, // Obtiene el valor del campo 'dni'
                nombre: document.getElementById('nombre').value, // Obtiene el valor del campo 'nombre'
                apellidos: document.getElementById('apellidos').value, // Obtiene el valor del campo 'apellidos'
                fechaNacimiento: fechaNacimientoInput.value, // Obtiene el valor del campo 'fechaNacimiento'
                email: emailInput.value, // Obtiene el valor del campo 'email'
                username: document.getElementById('username').value, // Obtiene el valor del campo 'username'
                password: passwordInput.value // Obtiene el valor del campo 'password'
            };
            // Muestra la información del alumno en un área específica de la página y en un cuadro de alerta
            document.getElementById('alumnoInfo').innerText = JSON.stringify(alumno, null, 2);
            alert('Alumno registrado:\n\n' + JSON.stringify(alumno, null, 2));
        } else {
            // Si hay errores en el formulario, muestra un cuadro de alerta pidiendo al usuario que los corrija
            alert('Por favor, corrija los errores en el formulario.');
        }
    });

    // EventListener para el campo de entrada del DNI
    dniInput.addEventListener('input', function() {
        // Si el DNI no es válido, muestra un mensaje de error
        if (!validateDNI()) {
            dniError.textContent = 'FORMATO DE DNI: "99999999X"';
        } else {
            // Si es válido, borra el mensaje de error
            dniError.textContent = '';
        }
    });

    // EventListener para el campo de entrada de la fecha de nacimiento
    fechaNacimientoInput.addEventListener('input', function() {
        // Si la fecha de nacimiento no es válida, muestra un mensaje de error
        if (!validateFechaNacimiento()) {
            fechaNacimientoError.textContent = 'La fecha de nacimiento no puede ser posterior a la fecha actual.';
        } else {
            // Si es válida, borra el mensaje de error
            fechaNacimientoError.textContent = '';
        }
    });

    // EventListener para el campo de entrada del correo electrónico
    emailInput.addEventListener('input', function() {
        // Si el formato del correo electrónico es inválido, muestra un mensaje de error
        if (emailInput.validity.typeMismatch) {
            emailError.textContent = 'El formato del correo electrónico no es válido.';
        } else {
            // Si es válido, borra el mensaje de error
            emailError.textContent = '';
        }
    });

    // EventListener para el campo de entrada del nombre de usuario
    document.getElementById('username').addEventListener('click', function() {
        // Genera un nombre de usuario predeterminado basado en el nombre y apellidos del alumno
        const nombre = document.getElementById('nombre').value.toLowerCase();
        const apellidos = document.getElementById('apellidos').value.toLowerCase().split(' ')[0];
        document.getElementById('username').value = nombre.charAt(0) + apellidos;
    });

    // Función para validar el formulario
    function validateForm() {
        // Valida el DNI, la fecha de nacimiento y el correo electrónico
        return validateDNI() && validateFechaNacimiento() && emailInput.validity.valid;
    }

    // Función para validar el DNI
    function validateDNI() {
        // Expresión regular para verificar el formato del DNI
        const dniPattern = /^\d{8}[a-zA-Z]$/;
        return dniPattern.test(dniInput.value);
    }

    // Función para validar la fecha de nacimiento
    function validateFechaNacimiento() {
        // Obtiene la fecha de nacimiento del campo de entrada y la fecha actual
        const fechaNacimiento = new Date(fechaNacimientoInput.value);
        const fechaActual = new Date();
        // Verifica si la fecha de nacimiento es anterior o igual a la fecha actual
        return fechaNacimiento <= fechaActual;
    }

    // Función para generar una contraseña aleatoria
    function generateRandomPassword(length) {
        // Conjunto de caracteres para la contraseña
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let password = '';
        // Genera una contraseña aleatoria de la longitud especificada
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    // Asigna una contraseña aleatoria al campo de contraseña
    passwordInput.value = generateRandomPassword(8);
});
