const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // ajuste o caminho se necessário

class Categoria extends Model {}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(120),
      allowNull: false
    },
    mae_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categoria',
  }
);

// RELACIONAMENTOS
Categoria.belongsTo(Categoria, { as: 'mae', foreignKey: 'mae_id' });      // categoria pertence a uma mãe
Categoria.hasMany(Categoria, { as: 'filhas', foreignKey: 'mae_id' });    // categoria tem várias filhas

module.exports = Categoria;
