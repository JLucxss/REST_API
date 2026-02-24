import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 63
    })
    name: string

    @Column({
        unique: true
    })
    email: string 

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: string

    @UpdateDateColumn()
    updatedAt: string

    @Column({
        enum: [1, 2]
    })
    role: number
    
}