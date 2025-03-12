import { DataSource } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/auth/entities/user.entity';
import * as dotenv from 'dotenv';
dotenv.config();
console.log('********', process.env.DB_PORT)
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'product_catalog',
  entities: [Product, User],
  migrations: ['src/migrations/*.ts'],
  synchronize: true
});

AppDataSource.initialize()
  .then(() => console.log('Data Source Initialized'))
  .catch((err) => console.error('Error initializing Data Source', err));
