import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [PrismaService],
    exports: []
})
export class UserModule {}