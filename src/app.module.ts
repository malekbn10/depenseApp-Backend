import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TransactionModule } from './transaction/transaction.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //imports: [MongooseModule.forRoot("mongodb+srv://depense:depense@cluster0.6ygivbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"), UserModule, TransactionModule],
  imports: [TypeOrmModule.forRoot({
    type: "mongodb",
    url: "mongodb+srv://depense:depense@cluster0.6ygivbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    synchronize: true,
    useUnifiedTopology: true,
    database: "depensedb",
    autoLoadEntities: true,
  }),UserModule, TransactionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
