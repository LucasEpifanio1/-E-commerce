const { Model, DataTypes } = require('sequelize');

class Categoria extends Model {
  static init(sequelize) {
    return super.init(
      {
        nome: {
          type: DataTypes.STRING(120),
          allowNull: false,
        },
        mae_id: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: 'categoria',
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Categoria, {
      as: 'mae',
      foreignKey: 'mae_id',
    });

    this.hasMany(models.Categoria, {
      as: 'filhas',
      foreignKey: 'mae_id',
    });
  }
}

module.exports = Categoria;
