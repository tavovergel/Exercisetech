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
    // Ejemplo usando fetch
    fetch("https://exercisetech.vercel.app/", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirigir o mostrar un mensaje de éxito
            window.location.href = 'pagina-inicial.html';
            messageElement.textContent = 'Inicio de sesión exitoso.';
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
