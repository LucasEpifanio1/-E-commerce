// models/Produto.js
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Produto', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    descricao: DataTypes.TEXT,
    preco: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    foto_url: DataTypes.STRING,
    ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
    vendedor_id: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'produto',
    timestamps: true
  });
};
