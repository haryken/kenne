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
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    dialect: process.env.DB_CONNECTION,
  },
  database_test: {
    storage: process.env.DB_STORAGE,
    dialect: process.env.DB_CONNECTION,
  },
};
