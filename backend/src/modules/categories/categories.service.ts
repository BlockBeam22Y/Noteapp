import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from './categories.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class CategoriesService implements OnModuleInit {
    constructor(
        @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>,
        @Inject('preload') private readonly categoryNames: string[]
    ) {}

    async onModuleInit() {
        const categories = this.categoryNames.map(
            name => this.categoriesRepository.create({ name })
        );

        return this.categoriesRepository.upsert(categories, {
            conflictPaths: {
                name: true
            }
        });
    }

    async getCategories() {
        return this.categoriesRepository.find();
    }
}