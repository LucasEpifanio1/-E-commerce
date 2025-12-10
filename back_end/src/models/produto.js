const { Model, DataTypes } = require("sequelize");

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: DataTypes.STRING,
        descricao: DataTypes.STRING,
        preco: DataTypes.FLOAT,
        foto_url: DataTypes.STRING
      },
      {
        sequelize,
        modelName: "Produto",
        tableName: "produto"
      }
    );
  }
}

module.exports = Produto;
