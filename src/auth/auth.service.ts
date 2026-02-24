import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt'
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class AuthService {

    private issuer: string = 'login'
    private audience: string = 'users'
    
    constructor(
        private readonly jwtservice: JwtService, 
        private readonly userService: UserService,
        private readonly mailer: MailerService
    ){}

    createToken (user: User) {
        
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

    checkToken (token: string) {
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

    isValidToken (token: string) {
        try {
            this.checkToken(token)
            return true
        } catch (e) {
            return false
        }
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({ where: { email } })
    
        if(!user) {
            throw new UnauthorizedException(`Credenciais inválidas`)
        }

        if(!await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException(`Credenciais inválidas`)
        }

        return this.createToken(user)
    }

    async forgetPass(email: string) {
        const user = await this.prisma.user.findFirst({ where: {email} })
    
        if (!user) {
            throw new UnauthorizedException('E-mail está incorreto')
        }

        const token = this.jwtservice.sign({
            id: user.id
        },{
            expiresIn: "30 minutes",
            subject: String(user.id),
            issuer: 'forget',
            audience: 'users'
        })

        await this.mailer.sendMail({
            subject: 'Recuperação de senha',
            to: 'John@gmail.com',
            template: 'forget',
            context: {
                name: user.name,
                token
            }
        })

        return true
    }

    async resetPass (newPassword: string, token: string) {
        
        
         try {
            const data: any = this.jwtservice.verify(token, {
                issuer: 'forget',
                audience: 'users'
            })

            if (isNaN(Number(data.id))) {
                throw new BadRequestException('Token inválido')
            }

            const salt = await bcrypt.genSalt();
            newPassword = await bcrypt.hash(newPassword, salt);

        const user = await this.prisma.user.update({ 
            where: { id: data.id },
            data: { password: newPassword }
         })

         return this.createToken(user)

        } catch(e) {
            throw new BadRequestException(e)
        }
        
    }

    async register(data: AuthRegisterDto) {
        const user =  await this.userService.create(data)

        return this.createToken(user)
    }
}