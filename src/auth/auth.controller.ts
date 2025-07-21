import { Body, Controller, Post } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthForgetPassDto } from "./dto/auth-forgetPass.dto";
import { AuthResetPassDto } from "./dto/auth-resetPass.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ){}

    @Post('login')
    async login(@Body() {email, password}: AuthLoginDto) {
        return this.authService.login(email, password)
    }

    @Post('register')
    async register(@Body() body: AuthRegisterDto) {
        return this.authService.register(body)
    }

    @Post('forgetPass')
    async forgetPass(@Body() {email}: AuthForgetPassDto) {
        return this.authService.forgetPass(email)
    }

    @Post('resetPass')
    async resetPass (@Body() { password, token}: AuthResetPassDto) {
        return this.authService.resetPass(password, token)
    }
}