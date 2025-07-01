import { Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService{

    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateUserDTO){
         
        return await this.prisma.users.create({
            data,
        })
    }

    async list() {
        return this.prisma.users.findMany()
    }

    async readOne(id: number) {
        return this.prisma.users.findUnique({ where: {id} })
    }

    async update(data: UpdatePutUserDTO, id: number){
        return this.prisma.users.update({ data, where: { id } })
    }

    async partialUpdate(data: UpdatePatchUserDTO, id: number){
        return this.prisma.users.update({ data, where: { id } })
    }
}