const { Router } = require("express");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Diet } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// ver index.js de api

router.get("/", async (req, res) => {
  try {
    const dbGetAll = await Diet.findAll();
    res.status(200).send(dbGetAll);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
