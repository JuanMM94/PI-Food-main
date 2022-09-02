const { Sequelize, DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: Sequelize.INTEGER,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plate_summary: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    health_score: {
      type: DataTypes.FLOAT
    },
    step_by_step: {
      type: DataTypes.JSON,
    },
    image: {
      type: DataTypes.STRING,
    }
  });
};
