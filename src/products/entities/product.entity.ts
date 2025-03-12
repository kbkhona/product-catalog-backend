import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false})
    name: string;

    @Column({ type: 'float' , nullable: false})
    price: number;

    @Column({ type: 'text', nullable: true})
    description: string;

}
