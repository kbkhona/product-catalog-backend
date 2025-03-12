import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post('login')
    login(@Body(new ValidationPipe) loginPayload: AuthPayloadDto) {
        return this.authService.loginUser(loginPayload)
    }

    @Post('create-account')
    createAccount(@Body(new ValidationPipe) createUserPayload: AuthPayloadDto) {
        return this.authService.createUserAccount(createUserPayload)
    }

}
