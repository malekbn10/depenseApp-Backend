import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './Schemas/transaction.schema';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports:[MongooseModule.forFeature([{name : Transaction.name , schema : TransactionSchema}]),CategoryModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
