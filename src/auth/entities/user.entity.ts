import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ unique: true, nullable: false } )
    username: string;

    @Column({ nullable: false } )
    password: string;
}