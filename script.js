// script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    
    if (username === '' || password === '') {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Aquí puedes agregar lógica adicional para validar el formato del usuario y la contraseña.

    console.log('Usuario:', username);
    console.log('Contraseña:', password);

    // Enviar los datos al servidor
    fetch("/login", { // Asegúrate de que esta URL apunte a tu endpoint del servidor
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre_usuario: username, contrasena: password }) // Asegúrate de que los nombres de los campos coincidan con los del servidor
    })
    .then(response => response.json())
    .then(data => {
        const messageElement = document.getElementById('message');
        if (response.ok) {
            // Mostrar un mensaje de éxito
            messageElement.className = 'alert alert-success';
            messageElement.textContent = data.mensaje;
            messageElement.style.display = 'block';
            // Redirigir o realizar otras acciones aquí si es necesario
        } else {
            // Mostrar un mensaje de error
            messageElement.className = 'alert alert-danger';
            messageElement.textContent = data.mensaje;
            messageElement.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const messageElement = document.getElementById('message');
        messageElement.className = 'alert alert-danger';
        messageElement.textContent = 'Error en la solicitud';
        messageElement.style.display = 'block';
    });
});
