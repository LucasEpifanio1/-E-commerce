const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./usuario');
const ItemPedido = require('./ItemPedido');

class Pedido extends Model {}

Pedido.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_pedido: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Pedido',
    tableName: 'pedido'
  }
);

Pedido.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuario_id' });
Pedido.hasMany(ItemPedido, { as: 'itens', foreignKey: 'pedido_id' });

module.exports = Pedido;
