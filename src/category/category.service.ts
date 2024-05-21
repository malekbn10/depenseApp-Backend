import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './Schema/category.schema';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(@InjectModel(Category.name) private categoryModel:Model<CategoryDocument>){}
  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel({ ...createCategoryDto });
    return category.save();  }

  async findAll() {
    return await this.categoryModel.find();
  }
  async findByName(name : string){
    const category = await this.categoryModel.findOne({name : name}) ;
    return category;
  }
  async findOne(_id: string) {
    const categoryFound = await this.categoryModel.findById({_id});
    return categoryFound;   }

  async update(_id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryModel.updateOne(  {_id}, {UpdateCategoryDto} );
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id).exec();

  }
}
