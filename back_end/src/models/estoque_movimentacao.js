module.exports = (sequelize, DataTypes) => {
  const EstoqueMovimentacao = sequelize.define("EstoqueMovimentacao", {
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
  }, {
    tableName: "estoque_movimentacao"
  });

  // Relação
  EstoqueMovimentacao.associate = models => {
    EstoqueMovimentacao.belongsTo(models.Produto, {
      foreignKey: "produto_id",
      as: "produto"
    });
  };

  return EstoqueMovimentacao;
};
