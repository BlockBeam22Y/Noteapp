import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Note from '../notes/notes.entity';

@Entity('categories')
export default class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        unique: true
    })
    name: string;

    @ManyToMany(() => Note, note => note.categories)
    @JoinTable()
    notes: Note[];
}