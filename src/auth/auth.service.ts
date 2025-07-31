import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "generated/prisma";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import { access } from "fs";

@Injectable()
export class AuthService {

    private issuer: 'login'
    private audience: 'users'
    
    constructor(
        private readonly jwtservice: JwtService, 
        private readonly prisma: PrismaService,
        private readonly userService: UserService
    ){}

    async createToken (user: User) {
        
        return {
            accessToken: this.jwtservice.sign({ 
            id: user.id,
            name: user.name,
            email: user.email
        }, {
            expiresIn: "7 days",
            subject: String(user.id),
            issuer: this.issuer,
            audience: this.audience
        })
        }
    }

    async checkToken (token: string) {
        try {
            const data = this.jwtservice.verify(token, {
                issuer: this.issuer,
                audience: this.audience
            })
            return data

        } catch(e) {
            throw new BadRequestException(e)
        }

    }

    async isValidToken (token: string) {
        try {
            this.checkToken(token)
            return true
        } catch (e) {
            return false
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({ where: {email, password} })
    
        if(!user) {
            throw new UnauthorizedException(`Credenciais inválidas`)
        }

        return this.createToken(user)
    }

    async forgetPass(email: string) {
        const user = this.prisma.user.findFirst({ where: {email} })
    
        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto')
        }

        //TO DO: Enviar o email

        return true
    }

    async resetPass (newPassword: string, token: string) {
        
        //TO DO: Validar o token
        const id = 0

        const user = await this.prisma.user.update({ 
            where: { id },
            data: {password: newPassword}
         })

         return this.createToken(user)
    }

    async register(data: AuthRegisterDto) {
        const user =  await this.userService.create(data)

        return this.createToken(user)
    }
}