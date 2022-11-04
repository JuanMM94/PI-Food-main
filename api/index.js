//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const axios = require("axios");
const { conn, Diet, Recipe } = require("./src/db.js");
const { YOUR_API_KEY } = process.env;

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
  (async () => {
    const dietsPreload = [
      { name: "Gluten Free" },
      { name: "Ketogenic" },
      { name: "Lacto Ovo Vegetarian" },
      { name: "Vegan" },
      { name: "Pescatarian" },
      { name: "Paleo" },
      { name: "Primal" },
      { name: "Low FODMAP" },
      { name: "Whole30" },
    ];
    const recipesCountAll = await Recipe.count();
    const recipesAmount = 100;
    const dietsCountAll = await Diet.count();
    if (dietsCountAll !== 9) {
      Diet.bulkCreate(dietsPreload)
        .then(console.log("Diets have been preloaded successfully"))
        .catch((error) => console.log("Error in Diets preload", error));
    } else console.log("Diets already exist in the database");
    if (recipesCountAll !== recipesAmount) {
      const getAllRecipes = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=${recipesAmount}`
      );
      const recipesArray = [];
      getAllRecipes.data.results.forEach((element) => {
        recipesArray.push({
          title: element.title,
          summary: element.summary,
          healthScore: element.healthScore,
          steps: element.analyzedInstructions[0]
            ? JSON.stringify(element.analyzedInstructions[0].steps)
            : null,
          image: element.image,
        });
      });
      Recipe.bulkCreate(recipesArray)
        .then(console.log("Recipes have been preloaded successfully"))
        .catch((error) => console.log("Error in Recipes preload", error));
    } else console.log("Recipes already exist in the database");
  })();
});
