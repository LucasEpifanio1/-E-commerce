const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Categoria = require('./categoria'); // ajuste o caminho
const Usuario = require('./usuario'); // ajuste o caminho

class Produto extends Model {}

Produto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    vendedor_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    nome: {
      type: DataTypes.STRING(150),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    foto_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Produto',
    tableName: 'produto'
  }
);

// RELACIONAMENTOS
Produto.belongsTo(Usuario, { as: 'vendedor', foreignKey: 'vendedor_id' });
Produto.belongsToMany(Categoria, { through: 'produto_categoria', as: 'categorias', foreignKey: 'produto_id' });

module.exports = Produto;
