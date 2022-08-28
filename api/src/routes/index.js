const { Router } = require('express');
const dietsRouter = require('./diets');
const recipesRouter = require('./recipes');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/diets', dietsRouter);
router.use('/recipes', recipesRouter);

module.exports = router;
