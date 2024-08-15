document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Evita que el formulario se envíe de manera tradicional

        const formData = new FormData(loginForm);
        const data = {
            nombre_usuario: formData.get('username'),
            contrasena: formData.get('password')
        };

        try {
            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            
            if (response.ok) {
                // Login exitoso
                messageDiv.className = 'alert alert-success';
                messageDiv.textContent = result.mensaje;
            } else {
                // Credenciales incorrectas
                messageDiv.className = 'alert alert-danger';
                messageDiv.textContent = result.mensaje;
            }

            messageDiv.style.display = 'block';
        } catch (error) {
            console.error('Error en la solicitud:', error);
            messageDiv.className = 'alert alert-danger';
            messageDiv.textContent = 'Error en la solicitud';
            messageDiv.style.display = 'block';
        }
    });
});
