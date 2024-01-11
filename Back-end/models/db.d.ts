// models/db.d.ts

import { Sequelize, Model } from 'sequelize';

/**
 * Adicione aqui a interface para cada modelo que você tem.
 * Exemplo para um modelo User:
 */
export interface UserInstance extends Model {
  id: number;
  username: string;
  password: string;
  // outros campos...
}

export interface DB {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  User: typeof UserInstance;
  // Adicione outras propriedades para outros modelos
}

declare const db: DB;

export default db;
