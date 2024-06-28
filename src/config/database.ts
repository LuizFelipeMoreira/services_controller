import { Sequelize } from 'sequelize';

export const connection = new Sequelize('servicos', 'root', 'inclo1254', {
  host: 'localhost',
  dialect: 'mysql',
});
