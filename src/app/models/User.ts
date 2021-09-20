import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('users')
class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;
}

export default User;