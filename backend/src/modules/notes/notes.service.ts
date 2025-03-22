import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Note from './notes.entity';
import { Repository } from 'typeorm';
import Category from '../categories/categories.entity';

@Injectable()
export default class NotesService {
    constructor(
        @InjectRepository(Note) private readonly notesRepository: Repository<Note>
    ) {}

    async getNotes(isArchived: boolean) {
        return this.notesRepository.find({
            where: { isArchived },
            relations: {
                categories: true
            },
            order: {
                createdAt: 'DESC'
            }
        });
    }

    async createNote(title: string, content: string, categories: Category[]) {
        const note = this.notesRepository.create({
            title,
            content,
            categories
        });
        
        return this.notesRepository.save(note);
    }

    async updateNote(id: string, title: string, content: string, categories: Category[]) {
        await this.notesRepository.save({ id, title, content, categories });

        return id;
    }

    async archiveNote(id: string) {
        const note = await this.notesRepository.findOneByOrFail({ id });

        await this.notesRepository.update(id, { isArchived: !note.isArchived });
        return id;
    }

    async deleteNote(id: string) {
        await this.notesRepository.delete(id);

        return id;
    }
}