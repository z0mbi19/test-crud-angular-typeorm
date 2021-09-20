import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('categories')
class Categories {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    imagem: string;
}

export default Categories