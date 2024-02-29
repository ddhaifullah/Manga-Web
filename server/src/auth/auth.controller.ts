import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { AuthEntity } from "./entities/auth.entity";
import { LoginDto } from "./dto/login.dto";


@Controller('auth')
export class AuthController {
    constructor(
        private readonly authServie: AuthService
    ) {}

    @Post('login')
    @ApiOkResponse({
        type: AuthEntity
    })
    login(@Body() { email, password }: LoginDto) {
        return this.authServie.login(email, password)
    }
}