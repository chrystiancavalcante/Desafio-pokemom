import { Sequelize, Model, DataTypes } from 'sequelize';

const dbConnectionString = process.env.DB_CONNECTION_STRING;
if (!dbConnectionString) {
  throw new Error('DB_CONNECTION_STRING não está definida');
}

const sequelize = new Sequelize(dbConnectionString); 

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  password: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'createdat', 
  },
  updatedAt: {
    type: DataTypes.DATE,
    field: 'updatedat', 
  },  
}, {
  tableName: 'users',
  sequelize,
});

export default User;
