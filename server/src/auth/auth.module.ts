import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaModule } from "src/prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { UsersService } from "src/users/users.service";


export const jwtSecret = 'h03abJ8+IoA1OG7GjGBPZGR0RziJIk5UmsyZy+1J9gMJ++Kt6G+f4VWHmExpMf1lsI/YVjMwRLpSnaxuprHMHw'


@Module({
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: jwtSecret,
            signOptions: {
                expiresIn: '5m'
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, UsersService],
})

export class AuthModule { }