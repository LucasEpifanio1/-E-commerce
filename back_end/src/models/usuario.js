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
        nome: {
          type: DataTypes.STRING(100),
          allowNull: false
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true
        },
        senha: {
          type: DataTypes.STRING(100),
          allowNull: false
        }
      },
      {
        sequelize,
        tableName: 'usuario',
      }
    );
  }
}

module.exports = Usuario;
