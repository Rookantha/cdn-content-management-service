import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Content, ContentDocument } from './schemas/content.schema';
import { CreateContentDto, UpdateContentDto } from './dto/content.dto';

@Injectable()
export class ContentService {
  constructor(@InjectModel(Content.name) private contentModel: Model<ContentDocument>) {}

  async create(createContentDto: CreateContentDto): Promise<Content> {
    const newContent = new this.contentModel(createContentDto);
    return newContent.save();
  }

  async findAll(): Promise<Content[]> {
    return this.contentModel.find().exec();
  }

  async findOne(id: string): Promise<Content> {
    const content = await this.contentModel.findById(id).exec();
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  async update(id: string, updateContentDto: UpdateContentDto): Promise<Content> {
    const content = await this.contentModel.findByIdAndUpdate(id, updateContentDto, { new: true }).exec();
    if (!content) throw new NotFoundException('Content not found');
    return content;
  }

  async delete(id: string): Promise<void> {
    const result = await this.contentModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Content not found');
  }
}
