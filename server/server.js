const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();

// Configura la conexión a la base de datos
const pool = new Pool({
  connectionString: "postgres://default:auWpQHirkM39@ep-still-morning-a57kqzah.us-east-2.aws.neon.tech:5432/verceldb?sslmode=require"
});

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Servir archivos estáticos desde el directorio 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Función para ejecutar las consultas SQL
async function runQuery(query, params) {
  const client = await pool.connect();
  try {
    const res = await client.query(query, params);
    return res;
  } finally {
    client.release();
  }
}

// Endpoint para el login
app.post('/login', async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND contrasena = $2';

  try {
    const result = await pool.query(query, [nombre_usuario, contrasena]);
    if (result.rows.length > 0) {
      res.json({ mensaje: 'Login exitoso', usuario: result.rows[0] });
    } else {
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  } catch (err) {
    console.error('Error en la base de datos:', err);
    res.status(500).json({ mensaje: 'Error en la base de datos' });
  }
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
