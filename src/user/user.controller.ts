import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Controller('users')
export class UserController{

    @Post()
    async create(@Body() { email, name, password }: CreateUserDTO) {
        return { email, name, password }
    }

    @Get()
    async list() {
        return { users: [] }
    }

    @Get(':id')
    async readOne(@Param('id',ParseIntPipe) id: number) {
        return { user: {}, id }
    }

    @Put(':id')
    async update(@Body() { email, name, password }: UpdatePutUserDTO, @Param('id',ParseIntPipe) id: number) {
        return {
            method: 'Put',
            email, 
            name, 
            password,
            id
        }
    }

    @Patch(':id')
    async PartialUpdate(@Body() { email, name, password }: UpdatePatchUserDTO, @Param('id',ParseIntPipe) id: number) {
        return {
            method: 'Patch',
            email, 
            name, 
            password,
            id
        }
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id: number){
        return { id }
    }
}