import { BadRequestException, Body, Controller, FileTypeValidator, Headers, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthForgetPassDto } from "./dto/auth-forgetPass.dto";
import { AuthResetPassDto } from "./dto/auth-resetPass.dto";
import { UserService } from "src/user/user.service";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";

// For file handling
import { writeFile } from 'fs/promises';
import { join } from "path";

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

    @UseGuards(AuthGuard)
    @Post('me')
    async me (@User() user) {
        return { user }
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user, 
        @UploadedFile(new ParseFilePipe({ 
            validators: [
                new FileTypeValidator({ fileType: 'image/png'})
            ]
        })) photo: Express.Multer.File) {

        try{
            // Ensure the storage/photos directory exists before writing files in a real application
            const result = await writeFile(join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`), photo.buffer)

            return { result, message: 'Photo uploaded successfully' }
        }catch(e){
            throw new BadRequestException('File upload failed')
        }

    }


    // multiple files upload
    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {
        return files
    }


    @UseInterceptors(FileFieldsInterceptor([{
        name: 'photo', maxCount: 1
        
    },{
        name: 'documents', maxCount: 5
    }]))
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents: Express.Multer.File}) {
        return files
    }

    
}