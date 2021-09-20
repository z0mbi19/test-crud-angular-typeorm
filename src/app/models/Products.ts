import { Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinColumn, OneToOne } from 'typeorm'
import Categories from './Categories';

@Entity('products')
class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    imagem: string;

    @OneToOne(type => Categories, product => Products)
    @JoinColumn()
    IdCateg: Categories
}

export default Products