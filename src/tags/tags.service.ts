import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Tag, TagDocument } from './Schema/tag.schema';
import { Model } from 'mongoose';

@Injectable()
export class TagsService {
  constructor(@InjectModel(Tag.name) private tagModel : Model<TagDocument> ){}
  async create(createTagDto: CreateTagDto) {
    const tag = new this.tagModel({ ...createTagDto });
    return tag.save();  }

  async findAll() {
    return await this.tagModel.find();
  }

  async findOne(_id: string) {
    const tagFound = await this.tagModel.findById({_id});
    return tagFound;    }

  async update(_id: string, updateTagDto: UpdateTagDto) {
    return await this.tagModel.updateOne(  {_id}, {updateTagDto} );
  }

  async remove(_id: string) {
    return await this.tagModel.findByIdAndDelete(_id).exec();
  }
}
