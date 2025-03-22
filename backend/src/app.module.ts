import { Module } from '@nestjs/common';
import NotesModule from './modules/notes/notes.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import dbConfig from './config/typeorm'
import { TypeOrmModule } from '@nestjs/typeorm';
import CategoriesModule from './modules/categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService) => {
        return configService.get('typeorm');
      }
    }),
    NotesModule,
    CategoriesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
