import { Module } from '@nestjs/common';
import NotesController from './notes.controller';
import NotesService from './notes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Note from './notes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ Note ])],
    controllers: [NotesController],
    providers: [NotesService]
})
export default class NotesModule {}