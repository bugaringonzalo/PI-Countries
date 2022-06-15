const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "activity",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      difficulty: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          max: 5,
          min: 1,
        },
      },
      duration: {
        type: DataTypes.INTEGER,
      },
      season: {
        type: DataTypes.ENUM('Winter','Summer','Autumn','Spring'),
        allowNull: false
      },
    },
    {
      tableName: "activities",
      timestamps: false,
      underscored: true,
      // define el nombre de la tabla en plural
      freezeTableName: true,
      // para que no se ponga en plural
    }
  );
};
