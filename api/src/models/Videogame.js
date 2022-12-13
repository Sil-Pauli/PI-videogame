const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID, //UUID genera un numero especifico e irrepetible distinto a la api
      defaultValue: DataTypes.UUIDV4,
      allownull: false, //no permite que este vacio
      primaryKey: true //el iD
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    releaseDate: { //fecha de lanzamiento
      type: DataTypes.STRING,
    },
    rating: { //clasificacion
      type: DataTypes.DECIMAL,
    },
    platform: { //plataforma
      type: DataTypes.STRING, 
      allowNull:false,
    }
  });
};
