const { default: axios } = require('axios');
const { Router } = require('express');
const { YOUR_API_KEY } = process.env;

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Diet } = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const dietsArray = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Low FODMAP", "Whole30"]

router.get('/', async (req, res) => {
  try {
    dietsArray.forEach((el, i) => {
      Diet.findOrCreate({
        where: {
          id: i + 1,
          name: el
        }
      })
    })
    res.status(200).send(await Diet.findAll());
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
