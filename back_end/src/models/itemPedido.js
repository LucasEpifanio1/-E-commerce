const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Pedido = require('./Pedido');
const Produto = require('./Produto');

class ItemPedido extends Model {}

ItemPedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    produto_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'ItemPedido',
    tableName: 'item_pedido'
  }
);

ItemPedido.belongsTo(Pedido, { as: 'pedido', foreignKey: 'pedido_id' });
Pedido.hasMany(ItemPedido, { as: 'itens', foreignKey: 'pedido_id' });

ItemPedido.belongsTo(Produto, { as: 'produto', foreignKey: 'produto_id' });
Produto.hasMany(ItemPedido, { as: 'itens_pedido', foreignKey: 'produto_id' });

module.exports = ItemPedido;
