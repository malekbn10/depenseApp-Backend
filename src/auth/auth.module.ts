import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstant } from './constants/jwt.constant';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';

@Module({
  imports:[UserModule,MailerModule,JwtModule.register({
    global: true,
    secret:jwtConstant.secret,
    signOptions:{expiresIn : "1d"}
  })],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
