import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtservice: JwtService, 
        private readonly prisma: PrismaService
    ){}

    async createToken () {
        
    }

    async checkToken () {
        
    }

    async login(email: string, password: string) {
        const user = await this.prisma.users.findFirst({ where: {email, password} })
    
        if(!user) {
            throw new UnauthorizedException(`Credenciais inválidas`)
        }

        return user
    }

    async forgetPass(email: string) {
        const user = this.prisma.users.findFirst({ where: {email} })
    
        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto')
        }

        //TO DO: Enviar o email

        return true
    }

    async resetPass (newPassword: string, token: string) {
        
        //TO DO: Validar o token
        const id = 0

        await this.prisma.users.update({ 
            where: { id },
            data: {password: newPassword}
         })

         return true 
    }
}