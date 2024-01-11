// models/user.js

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      username: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: 'createdat' // Mapeia para o nome da coluna em snake_case
      },
      updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false,
        field: 'updatedat' // Mapeia para o nome da coluna em snake_case
      }
      // Adicione mais campos aqui, se necessário
    }, {
      // Opções adicionais
      tableName: 'users', // Nome da tabela no banco de dados
      timestamps: true, // Utiliza os campos createdAt e updatedAt
      underscored: true, // Usa snake_case para os campos automáticos
    });
  
    // Associações (relacionamentos) podem ser definidas aqui, se necessário
  
    return User;
  };
  