import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { TagsModule } from './tags/tags.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://depense:depense@cluster0.6ygivbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
   MailerModule.forRootAsync({
    inject: [ConfigService],
    useFactory  :  () => ({
      transport: {
        host : process.env.EMAIL_HOST,
        port : 2525,
        secure : false,
          auth : {
            user: process.env.EMAIL_USER,
            pass : process.env.EMAIL_PASS
        }
      }
    })
  })
    , UserModule, TransactionModule, AuthModule, TagsModule, CategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
