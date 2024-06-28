import { DataTypes } from 'sequelize';
import { connection } from '../config/database';

export const Services = connection.define('servicos', {
  nome: { type: DataTypes.STRING, allowNull: false },
  lente: { type: DataTypes.STRING, allowNull: false },
  laboratorio: { type: DataTypes.STRING, allowNull: false },
  os: { type: DataTypes.STRING, allowNull: false },
});

// Servicos.sync({ force: false })
//   .then(() => {
//     console.log('Tabela criada com sucesso !');
//   })
//   .catch((err) => console.log(err));
