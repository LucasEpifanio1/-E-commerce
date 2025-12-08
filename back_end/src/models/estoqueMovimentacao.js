const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Produto = require('./Produto');

class EstoqueMovimentacao extends Model {}

EstoqueMovimentacao.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_movimentacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'EstoqueMovimentacao',
    tableName: 'estoque_movimentacao'
  }
);

EstoqueMovimentacao.belongsTo(Produto, { as: 'produto', foreignKey: 'produto_id' });
Produto.hasMany(EstoqueMovimentacao, { as: 'movimentacoes', foreignKey: 'produto_id' });

module.exports = EstoqueMovimentacao;
