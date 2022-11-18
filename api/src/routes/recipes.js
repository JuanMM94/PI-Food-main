const { Router } = require('express');
const { Op } = require("sequelize");
const axios = require('axios').default;
const { YOUR_API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Recipe, Diet } = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);  

router.get('/', async (req, res) => {
  try {
    const axiosGetAll = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    if (req.query.name) {
      const dbGetTitle = await Recipe.findAll({
        include: [{
          model: Diet,
          attributes: ['name']
        }],
        where: {
          title: {
            [Op.iLike]: req.query.name
          }
        }
      });
      const axiosGetTitle = axiosGetAll.data.results.filter(el => el.title.toLowerCase().includes(req.query.name));
      const response = axiosGetTitle.concat(dbGetTitle);
      if (response.length > 0) res.status(200).send(response);
      else res.status(404).send(`Recipes containing ${req.query.name} not found.`);
    } else {
      let dbGetAll = await Recipe.findAll({
        include: [{
          model: Diet,
          attributes: ['name']
        }]
      });
          
      const result = Promise.all([axiosGetAll.data.results, dbGetAll]);
      result.then(([a, b]) => {
        const response = [...a,...b];
        res.status(200).send(response);
      });
    };
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.get('/:recipeId', async (req, res) => {
  const { recipeId } = req.params;
  try {
    if (recipeId.includes('-')) {
      const dbGetId = await Recipe.findByPk(recipeId);
      res.status(200).send(dbGetId);
    } else {
      const axiosGetId = await axios.get(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${YOUR_API_KEY}`);
      res.status(200).send(axiosGetId.data);  
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post('/create', async (req, res) => {
  const { title, summary, healthScore, steps, image, diets } = req.body;
  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      image
    });
    if (diets) {
      const newRecipeDiets = [...diets];
      const newRecipeId = Recipe.findAll({
        where: {
          title: {
            [Op.eq]: title
          }
        }
      });
      newRecipeId.then(res => {
        newRecipeDiets.forEach(el => axios.post(`https://pi-food-main-production.up.railway.app/api/recipes/${res[0].dataValues.id}/diets/${el}`))
      });
    };
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post('/:recipeId/diets/:dietsId', async (req, res) => {
  try {
    const { recipeId, dietsId } = req.params;
    const recipe = await Recipe.findByPk(recipeId);
    await recipe.addDiet(dietsId);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

module.exports = router;
