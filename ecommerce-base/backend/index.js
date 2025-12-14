// backend


import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './firebase.js';


// RUTAS

import authRoutes from './routes/auth.routes.js';
import productsRoutes from './routes/products.routes.js';

// FIREBASE

import './firebase.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// RUTAS API PROPIAS

app.use('/auth', authRoutes);
app.use('/api/products', productsRoutes);



// RUTA EXTERNA FAKESTORE


// Obtener todo

app.get('/products', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Obtener por ID
app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await fetch(`https://fakestoreapi.com/products/${id}`);
    const product = await response.json();
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});


// 404 rutas desconocidas

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});


// Middleware global de errores

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || 'Error del servidor'
  });
});

// Servidor
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
