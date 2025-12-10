const { Model, DataTypes } = require('sequelize');

class Usuario extends Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        nome: DataTypes.STRING,
        email: DataTypes.STRING,
        senha: DataTypes.STRING
      },
      {
        sequelize,
        modelName: 'usuario',
        tableName: 'usuario'
      }
    );
  }
}

module.exports = Usuario;
