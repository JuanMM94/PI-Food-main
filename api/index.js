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
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
  const preload = async () => {
    const dietsPreload = [
      { name: "Gluten Free" },
      { name: "Ketogenic" },
      { name: "Lacto Ovo Vegetarian" },
      { name: "Vegan" },
      { name: "Pescetarian" },
      { name: "Paleo" },
      { name: "Primal" },
      { name: "Low FODMAP" },
      { name: "Whole30" },
    ];
    const recipeFindAll = await Recipe.findAll();
    if (recipeFindAll.length === 0) {
      const axiosGetAll = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${YOUR_API_KEY}&addRecipeInformation=true&number=1`
      );
      axiosGetAll.data.results.forEach((element) => {
        return Recipe.findOrCreate(element);
      });
    }
    Diet.bulkCreate(dietsPreload)
      .then(console.log("Diets have been preloaded succesfully"))
      .catch((error) => console.log("Error in Diets preload", error));
  };
  preload();
});
