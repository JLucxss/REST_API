import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, UseGuards } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/roles.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";

@Roles(Role.Admin)
@UseGuards(AuthGuard ,RoleGuard)
@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() data: CreateUserDTO) {
        return this.userService.create(data)
    }

    @Get()
    async list() {
        return this.userService.list()
    } 

    @Get(':id')
    async readOne(@Param('id',ParseIntPipe) id: number) {
        return this.userService.readOne(id)
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @Param('id',ParseIntPipe) id: number) {
        return this.userService.update(data, id)
    }

    @Patch(':id')
    async partialUpdate(@Body() data: UpdatePatchUserDTO, @Param('id',ParseIntPipe) id: number) {
        return this.userService.partialUpdate(data, id)
    }

    @Delete(':id')
    async delete(@Param('id',ParseIntPipe) id: number){
        return this.userService.delete(id)
    }
}