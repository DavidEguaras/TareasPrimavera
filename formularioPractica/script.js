let numMatricula = "001"

document.addEventListener('DOMContentLoaded', function(){
    // Elements
    const form = document.getElementById('registroForm');
    const dniInput = document.getElementById('dni');
    const dniError = document.getElementById('dniError');
    const nombre = document.getElementById('nombre');
    const apellidos = document.getElementById('apellidos');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');
    const fechaNacimientoError = document.getElementById('fechaNacimientoError');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const username = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Create the alumnoInfo element and append it to the DOM
    const alumnoInfo = document.createElement('div');
    alumnoInfo.id = 'alumnoInfo';
    document.body.appendChild(alumnoInfo);

    // When the form is submitted
    form.addEventListener('submit', function(event){
        event.preventDefault();
        if(validateForm()){
            const alumno = {
                matricula: numMatricula,
                grupo: document.getElementById('grupo').value,
                dni: dniInput.value,
                nombre: nombre.value,
                apellidos: apellidos.value,
                fechaNacimiento: fechaNacimientoInput.value, 
                email: emailInput.value,
                username: username.value, 
                password: passwordInput.value
            };
            
            alumnoInfo.innerText = JSON.stringify(alumno, null, 2);
            alert('Alumno registrado:\n\n' + JSON.stringify(alumno, null, 2));
            numMatriculas++;
        } else {
            alert('Por favor, corrija los errores en el formulario.');
        }
    });

    // Event listeners for DNI, fechaNacimiento, email, username
    dniInput.addEventListener('input', function(){
        if(!validateDNI()){
            dniError.textContent = 'Formato de DNI: 99999999X'
        } else {
            dniError.textContent = ''
        }
    });

    fechaNacimientoInput.addEventListener('input', function(){
        if(!validateFechaNacimiento()){
            fechaNacimientoError.textContent = "La fecha de nacimiento no puede ser posterior a la actual"
        } else {
            fechaNacimientoError.textContent = '';
        }
    });
    
    emailInput.addEventListener('input', function(){
        if(!validateEmail()){
            emailError.textContent = "El email debe tener un formato correcto"
        } else {
            emailError.textContent = '';
        }
    });

    nombre.addEventListener('input', generateUsername);
    apellidos.addEventListener('input', generateUsername);

    // Functions for validation
    function validateForm(){
        return validateDNI() && validateFechaNacimiento() && validateEmail();
    }

    function validateDNI(){
        const dniPattern =  /^\d{8}[a-zA-Z]$/;
        return dniPattern.test(dniInput.value);
    }

    function validateFechaNacimiento(){
        const fechaNacimiento = new Date(fechaNacimientoInput.value);
        const fechaActual = new Date();
        return fechaNacimiento <= fechaActual;
    }

    function validateEmail(){
        const emailPattern = /^\S+@\S+\.\S+$/;
        return emailPattern.test(emailInput.value);
    }

    function generateUsername(){
        const nombreUsername = nombre.value.toLowerCase();
        const apellidoUsername = apellidos.value.toLowerCase().split(' ')[0];
        username.value = nombreUsername.charAt(0) + apellidoUsername;
    }

    function generateRandomPassword(length){
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    }

    // Generate and assign random password
    passwordInput.value = generateRandomPassword(8);
});
