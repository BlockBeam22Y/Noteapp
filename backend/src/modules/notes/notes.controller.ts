import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import NotesService from './notes.service';

@Controller('notes')
export default class NotesController {
    constructor(private readonly notesService: NotesService) {}

    @Get()
    async get(@Query('archived') archived: boolean) {
        return this.notesService.getNotes(archived);
    }

    @Post()
    async create(@Body() body) {
        const { title, content, categories } = body;

        return this.notesService.createNote(title, content, categories);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() body) {
        const { title, content, categories } = body;

        return this.notesService.updateNote(id, title, content, categories);
    }

    @Put('/archive/:id')
    async archive(@Param('id') id: string) {
        return this.notesService.archiveNote(id);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string) {
        return this.notesService.deleteNote(id);
    }
}