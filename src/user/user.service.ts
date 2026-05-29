import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from 'bcrypt'
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService{

    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>
    ) {}

    async create(data: CreateUserDTO){

        if(
            await this.usersRepository.exists({
            where: { email: data.email} 
        })
        ) {
            throw new BadRequestException('Este email já está sendo usado!') 
        }

        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
         
        const user = this.usersRepository.create(data)

        return this.usersRepository.save(user)
    }

    async list() {
        return this.usersRepository.find()
    }

    async readOne(id: number) {
        await this.exists(id)

        return this.usersRepository.findOneBy({ id })
    }

    async update(data: UpdatePutUserDTO, id: number){ 
        
        await this.exists(id)
        
        data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())

        return this.usersRepository.update(id, { 
            email: data.email,
            name: data.name,
            password: data.password,
            role: data.role
         })
    }

    async partialUpdate(data: UpdatePatchUserDTO, id: number){
        
        await this.exists(id)

        if(data.password) {
            data.password = await bcrypt.hash(data.password, await bcrypt.genSalt())
        }

        return this.usersRepository.update(id, data)
    }

    async delete(id: number) {

        await this.exists(id)

        return this.usersRepository.delete(id)
    }

    async exists(id: number) {
        if(!await this.usersRepository.exists({where: {id} })){
            throw new NotFoundException(`O usuário ${id} não existe`)
        }
    }
}