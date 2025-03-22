import { Controller, Get } from '@nestjs/common';
import CategoriesService from './categories.service';

@Controller('categories')
export default class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async get() {
        return this.categoriesService.getCategories();
    }
}