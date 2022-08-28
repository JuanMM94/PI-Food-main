const { Router } = require('express');
const { Recipe } = require('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res, next) => {
  console.log(Recipe);
  return Recipe.getAll()
  .then((recipes) => {
    res.send(recipes)
  })
});

router.post('/', (req, res, next) => {
  res.send('post /recipe')
});

router.put('/', (req, res, next) => {
  res.send('put /recipe')
});

router.delete('/', (req, res, next) => {
res.send('delete /recipe')
});

module.exports = router;
