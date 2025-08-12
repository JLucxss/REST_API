import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { UserModule } from "src/user/user.module";
import { PrimasModule } from "src/prisma/prima.module";
import { AuthService } from "./auth.service";

@Module({
    imports: [JwtModule.register({
        secret: "JL085COM32CARACTERES!PQTEMQTER32"
    }), 
    forwardRef(() => UserModule),
    PrimasModule],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [AuthService]
})
export class AuthModule {

}