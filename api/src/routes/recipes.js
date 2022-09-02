const { Router, response, request } = require('express');
const { Op } = require("sequelize");
const axios = require('axios').default;
const { YOUR_API_KEY } = process.env;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Recipe } = require('../db');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);  

router.get('/', async (req, res) => {
  try {
    const axiosGetAll = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&number=100`);
    if (req.query.name) {
      const dbGetName = await Recipe.findAll({
        where: {
          name: {
            [Op.iLike]: req.query.name
          }
        }
      });
      const axiosGetName = axiosGetAll.data.results.filter(el => el.title.toLowerCase().includes(req.query.name));
      const response = axiosGetName.concat(dbGetName);
      if (response.length > 0) res.status(200).send(response);
      else res.status(404).send(`Recipes containing ${req.query.name} not found.`);
    } else {
      const dbGetAll = await Recipe.findAll();
      try {
        const result = Promise.all([axiosGetAll.data.results, dbGetAll]);
        result.then(([a, b]) => {
          const response = a.concat(b);
          res.status(200).send(response);
        });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

router.get('/:idRecipe', async (req, res) => {
  const { idRecipe } = req.params;
  try {
    if (/\d*/.test(idRecipe)) {
      const axiosGetId = await axios.get(`https://api.spoonacular.com/recipes/${idRecipe}/information?apiKey=${YOUR_API_KEY}`);
      res.status(200).send(axiosGetId.data);  
    } else if (/[\w\d]{8}\b-.*/.test(idRecipe)) {
      const dbGetId = await Recipe.findAll({
        where: {
          id: {
            [Op.eq]: idRecipe
          }
        }
      });
      dbGetId.then(res.status(200).send(dbGetId));
    }
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  const { name, plate_summary, health_score, step_by_step, image } = req.body;
  try {
    const newRecipe = await Recipe.create({
      name,
      plate_summary,
      health_score,
      step_by_step,
      image
    });
    res.status(201).json(newRecipe);
  } catch (err) {
    console.log(err);
  }
});

/* 
(async () => {
  try {
    const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=100`);
    const results = response.data.results;
    results.forEach(e => Recipe.create({
      id: e.id,
      name: e.title,
      plate_summary: e.summary,
      step_by_step: e.analyzedInstructions,
      health_score: e.healthScore,
      image: e.image
    }));
  } catch (err) {
    console.log(err);
  }
})()


router.get('/', async (req, res) => {
 try {
  if (req.query.name) {
    res.status(200).send(await Recipe.findAll({
      where: {
        name: {
          [Op.like]: req.query.name
        }
      }
    }));
  }
  else res.status(200).send(await Recipe.findAll());
 } catch (err) {
  console.log(err);
 }
});

router.get('/:idRecipe', async (req, res) => {
  const { idRecipe } = req.params;
  try {
    const recipe = await Recipe.findAll({
      where: {
        id: idRecipe
      }
    });
    res.status(200).send(recipe);
  } catch (err) {
   console.log(err);
  }
 });
 */

module.exports = router;
