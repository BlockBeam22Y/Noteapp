import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import Category from '../categories/categories.entity';

@Entity('notes')
export default class Note {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({
        default: false
    })
    isArchived: boolean;

    @ManyToMany(() => Category, category => category.notes, {
        onDelete: 'CASCADE'
    })
    categories: Category[];

    @CreateDateColumn()
    createdAt: Date;
}