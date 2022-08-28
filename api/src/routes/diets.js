const { Router } = require('express');
const { Diets } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res, next) => {
  res.send('get /diet')
});

router.post('/', (req, res, next) => {
  res.send('post /diet')
});

router.put('/', (req, res, next) => {
  res.send('put /diet')
});

router.delete('/', (req, res, next) => {
res.send('delete /diet')
});

module.exports = router;
