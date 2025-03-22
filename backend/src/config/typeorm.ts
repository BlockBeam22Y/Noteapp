import { registerAs } from '@nestjs/config'
import { db } from './envs'
import { DataSource, DataSourceOptions } from 'typeorm'
import Note from 'src/modules/notes/notes.entity';
import Category from 'src/modules/categories/categories.entity';

const dbConfig = {
    type: 'postgres',
    database: db.database,
    host: db.host,
    port: db.port,
    username: db.username,
    password: db.password,
    synchronize: true,
    entities: [Note, Category]
}

export default registerAs('typeorm', () => dbConfig);

export const AppDataSource = new DataSource(dbConfig as DataSourceOptions);