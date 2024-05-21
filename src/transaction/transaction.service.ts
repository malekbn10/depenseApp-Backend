import { BadRequestException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './Schemas/transaction.schema';
import { Date, Model } from 'mongoose';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
            private readonly categoryService : CategoryService) { }
  
  async create(createTransactionDto: CreateTransactionDto) {
    const category  = await this.categoryService.findByName(createTransactionDto.category.name);
    if(!category){
      throw new BadRequestException("Invalid Category");
      
    }
    const transaction = new this.transactionModel({ ...createTransactionDto });
    return transaction.save();
  }

  async findAll() {
    return await this.transactionModel.find();
  }
  async findByCategory(category : string){
    const transactionsFound = await this.transactionModel.find({category : category})
    return transactionsFound ;
  }
  async findByDate(date1 : Date ,date2 : Date ){
    const transactionsFound = await this.transactionModel.find({date:{$gte : date1 , $lt : date2}})
    return transactionsFound ;
  }
  async findOne(_id: string) {
    const transactionFound = await this.transactionModel.findById({_id});
    if(!transactionFound){
      throw new BadRequestException("Transaction Not Found !");
      
    }
    return transactionFound; 
   }

  async update(_id: string, updateTransactionDto: UpdateTransactionDto) {
    return await this.transactionModel.updateOne(  {_id}, {updateTransactionDto} );
  }

  async remove(id: string) {
    return await this.transactionModel.findByIdAndDelete(id).exec();
  }
}
