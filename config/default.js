const dotenv = require('dotenv');
const path = require('path');

const rootPath = process.cwd();

const createEnvAccessPoint = () => {
  const environment = process.env.NODE_ENV ? process.env.NODE_ENV.replace(/\W/g, '') : 'production';

  if (environment === 'production') {
    return '.env';
  }

  return `.env.${environment}`;
};

dotenv.config({ path: path.join(__dirname, '../', `${createEnvAccessPoint()}`) });

module.exports = {
  port: process.env.PORT || '5000',
  node_env: process.env.NODE_ENV.replace(/\W/g, '') || 'production',
  jwt_secret: process.env.JWT_SECRET || 'secret',
  jwt_expired_date: process.env.JWT_EXPIRED_DATE || '30d',
  root_path: rootPath,
  database: {
    username: 'afitynvyieawdr',
    password: '17ed230aa14dc36c69baf2a5cb4883ac2dc114cdf4ae6948b4e0bc6b7c739ed2',
    database: 'd1sfkjln5dlhgo',
    host: 'ec2-3-223-169-166.compute-1.amazonaws.com',
    dialect: 'postgres',
  },
  database_test: {
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_CONNECTION,
  },
};
