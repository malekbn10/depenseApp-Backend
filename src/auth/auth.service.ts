import { BadRequestException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from './../user/user.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthEmailDto } from './dto/auth-email.dto';
import { User } from 'src/user/Schemas/user.schema';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService,
        private readonly jwtService: JwtService,
        private readonly mailService: MailerService
    ) { }


    async register({ fullname, email, password }: RegisterDto) {
        const user = await this.userService.findOneByEmail(email);
        if (user) {
            throw new BadRequestException("Email alredy exists");
        }
        const hashedPassword = await bcryptjs.hash(password, 10);
        await this.userService.create({
            fullname,
            email,
            password: hashedPassword,
        });
        return {
            message: "User created successfully",
        };


    }

    async login({ email, password }: LoginDto) {
        const user = await this.userService.findOneByEmail(email);
        if (!user) {
            throw new UnauthorizedException("Invalid Informations");
        }
        const isPasswordValid = await bcryptjs.compare(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException("Invalid Informations");
        }
        const payload = { email: user.email };
        const token = await this.jwtService.signAsync(payload);
        return {
            token: token,
            email: user.email,
        };

    }




    async forgotPassword(email: string) {
        const user = await this.userService.findOneByEmail(email);
        if (!user)
            throw new NotFoundException(HttpStatus.NOT_FOUND, "user doesn't exist");
        const payload = { id: user.id, email: user.email };
        const token = this.createToken(payload, user);
        const link = `${process.env.BASE_URL}/auth/resetPassword/${token}`;

        await this.mailService.sendMail({
            from: 'Depenses Platform <malekbennjima7@gmail.com>',
            to: email,
            subject: 'Reset your password',
            html: `Click <a href="${link}">here</a> to reset your password !`
        })
        return {
            message: "Please check your email ! "
        }
    }

    /*  async resetPasswordEmail(forgotPasswordDto: AuthEmailDto) {
          const email = forgotPasswordDto.email;
          const user = await this.userService.findOneByEmail(email);
          if (!user)
              throw new NotFoundException((HttpStatus.NOT_FOUND, "user doesn't exist"),
              );
  
          const payload = { id: user.id, email: email };
          const token = this.createToken(payload, user);
          const link = `${process.env.BASE_URL}resetPassword/${user.id}/${token}`;
          const mailData: EmailTemplateParams = {
              to_name: user.full_name,
              to_email: email,
              link: link,
          };
          if (await this.emailService.sendForgotPasswordEmail(mailData)) {
              return customMessage(
                  HttpStatus.OK,
                  'if you are registered, you will shortly receive reset email link',
              );
          }
          throw new ServiceUnavailableException(
              customMessage(HttpStatus.SERVICE_UNAVAILABLE, 'Service is unavailable'),
          );
      }
  
      async resetPassord(
          id: string,
          token: string,
          resetPasswordDto: ResetPasswordDto,
      ) {
          const user = await this.userRepository.findOneBy({ id });
  
          try {
              const secret = JSON.stringify({
                  secret: process.env.SECRET_NON_AUTH,
                  updatedAt: user.updatedAt,
              });
              this.jwtService.verify(token, {
                  secret,
              });
          } catch (err) {
              throw new ForbiddenException(
                  customMessage(HttpStatus.FORBIDDEN, 'expired or invalid token'),
              );
          }
          if (!user)
              throw new NotFoundException(
                  customMessage(HttpStatus.NOT_FOUND, "user doesn't exist"),
              );
          if (resetPasswordDto.password !== resetPasswordDto.confirm_password)
              throw new ConflictException(
                  customMessage(HttpStatus.CONFLICT, "passwords don't match"),
              );
          const password = encodePassword(resetPasswordDto.password);
          const newUser = this.userRepository.create({
              password,
          });
          if (!(await this.userRepository.update(id, newUser)))
              throw new ServiceUnavailableException(
                  customMessage(
                      HttpStatus.SERVICE_UNAVAILABLE,
                      'something went wrong, please try again later',
                  ),
              );
          return customMessage(HttpStatus.OK, 'password reset successful');
      }
  */
    createToken(payload: object, user: User) {
        return this.jwtService.sign(payload, {
            secret: JSON.stringify({
                secret: process.env.SECRET_NON_AUTH,
            }),
        });
    }

    /* async forget({email} : AuthEmailDto){
             try {
             
             const user = await this.userService.findOneByEmail(email);
           
             if (!user) {
                 throw new BadRequestException("Email does not match");
 
             }
           
             // Generate reset token
 /            const resetToken2 = this.jwtService.signAsync({email : user.email},process.env.)
              const resetToken = this.jwtService.signAsync({ userId: user.id });
           
             // Send reset password link to user's email
             await transporter.sendMail({
               from: process.env.EMAIL_USER,
               to: user.email,
               subject: "Password Reset",
               html: `Click <a href="${resetLink}">here</a> to reset your password.`,
             });
           
             res.status(200).json({ success: true, message: "Password reset link sent to your email." });
            } catch (error) {
             console.error(error);
             res.status(500).json({ success: false, message: "Internal server error" });
     }
     }
     */
}


