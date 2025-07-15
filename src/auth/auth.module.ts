import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrimasModule } from "src/prisma/prima.module";

@Module({
    imports: [JwtModule.register({
        secret: "JL085COM32CARACTERES!PQTEMQTER32"
    }), 
    UserModule,
    PrimasModule],
    controllers: [AuthController],
})
export class AuthModule {

}