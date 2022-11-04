const { Router } = require("express");
const { Op } = require("sequelize");
const axios = require("axios").default;
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const { Recipe, Diet } = require("../db");
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const recipesFindByName = await Recipe.findAll({
        where: {
          title: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [
          {
            model: Diet,
            attributes: ["name"],
          },
        ],
      });
      res.send(recipesFindByName);
    } else {
      const recipesFindAll = await Recipe.findAll({
        include: [
          {
            model: Diet,
            attributes: ["name"],
          },
        ],
      });
      res.status(200).send(recipesFindAll);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.get("/:recipeId", async (req, res) => {
  const { recipeId } = req.params;
  try {
    const recipeFindId = await Recipe.findByPk(recipeId);
    res.status(200).send(recipeFindId);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/create", async (req, res) => {
  const { title, summary, healthScore, steps, image, diets } = req.body;
  try {
    const newRecipe = await Recipe.create({
      title,
      summary,
      healthScore,
      steps,
      image,
    });
    if (diets) {
      const newRecipeDiets = [...diets];
      const newRecipeId = Recipe.findAll({
        where: {
          title: {
            [Op.eq]: title,
          },
        },
      });
      newRecipeId.then((res) => {
        newRecipeDiets.forEach((element) =>
          axios.post(
            `http://localhost:3001/api/recipes/${res[0].dataValues.id}/diets/${element}`
          )
        );
      });
    }
    res.status(201).json(newRecipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(404);
  }
});

router.post("/:recipeId/diets/:dietsId", async (req, res) => {
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
