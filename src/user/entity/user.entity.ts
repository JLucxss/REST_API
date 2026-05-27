import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id!: number

    @Column({
        length: 63
    })
    name!: string

    @Column({
        length: 127,
        unique: true
    })
    email!: string 

    @Column({
        length: 127
    })
    password!: string

    @CreateDateColumn()
    createdAt!: string

    @UpdateDateColumn()
    updatedAt!: string

    @Column({
        default: 1
    })
    role!: number
    
}