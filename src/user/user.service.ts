import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './Schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) { }

  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel({ ...createUserDto });
        return user.save();
  }

  async findAll() {
    return await this.userModel.find();
  }
  

  async findOne(_id: string) {
    const userFound = await this.userModel.findById({_id});
    console.log(userFound);
    return userFound;
  }

  async findOneByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }
  async update(_id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.updateOne(  {_id}, {updateUserDto} );
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}
