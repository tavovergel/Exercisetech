const express = require('express');
const { Pool } = require('pg');

const app = express();

// Configura la conexión a la base de datos
const pool = new Pool({
  connectionString: "postgres://default:auWpQHirkM39@ep-still-morning-a57kqzah.us-east-2.aws.neon.tech:5432/verceldb?sslmode=require"
});

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Función para ejecutar las consultas SQL
async function runQuery(query) {
  const client = await pool.connect();
  try {
    const res = await client.query(query);
    return res;
  } finally {
    client.release();
  }
}

// Crear la tabla e insertar los usuarios si no existen
const createTableQuery = `
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nombre_usuario VARCHAR(50) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

INSERT INTO usuarios (nombre_usuario, contrasena)
VALUES 
    ('user1', '12345'),
    ('user2', '789456')
ON CONFLICT (nombre_usuario) DO NOTHING;  // Evita errores si el usuario ya existe
`;

runQuery(createTableQuery)
  .then(() => console.log('Tabla usuarios creada e inicializada con datos'))
  .catch(err => console.error('Error ejecutando la consulta:', err));

// Endpoint para el login
app.post('/api/login', async (req, res) => {
  const { nombre_usuario, contrasena } = req.body;
  const query = `SELECT * FROM usuarios WHERE nombre_usuario = $1 AND contrasena = $2`;

  try {
    const result = await pool.query({ text: query, values: [nombre_usuario, contrasena] });
    if (result.rows.length > 0) {
      res.json({ mensaje: 'Login exitoso', usuario: result.rows[0] });
    } else {
      res.status(401).json({ mensaje: 'Credenciales incorrectas' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error en la base de datos' });
  }
});

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
