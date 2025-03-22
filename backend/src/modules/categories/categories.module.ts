import { Module } from '@nestjs/common';
import CategoriesService from './categories.service';
import { categoryNames } from 'src/utils/preloadData';
import { TypeOrmModule } from '@nestjs/typeorm';
import Category from './categories.entity';
import CategoriesController from './categories.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ Category ])],
    controllers: [CategoriesController],
    providers: [
        CategoriesService,
        {
            provide: 'preload',
            useValue: categoryNames
        }
    ]
})
export default class CategoriesModule {}