import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UserController } from "./user.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { UserService } from "./user.service";
import { PrimasModule } from "src/prisma/prima.module";
import { UserIdCheckMiddleware } from "src/middlewares/userId-check.middleware";

@Module({
    imports: [PrimasModule],
    controllers: [UserController],
    providers: [PrismaService, UserService],
    exports: []
})
export class UserModule implements NestModule {

    configure(consumer: MiddlewareConsumer) {
        consumer.apply(UserIdCheckMiddleware).forRoutes({
            path: 'users/:id',
            method: RequestMethod.ALL
        })
    }
}