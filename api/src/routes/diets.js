const { default: axios } = require('axios');
const { Router } = require('express');
const { YOUR_API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Diet } = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ver index.js de api

module.exports = router;
