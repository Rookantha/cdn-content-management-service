import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { CreateContentDto } from '../dto/create.content.dto';

@Injectable()
export class ValidateCreateContentPipe implements PipeTransform {
  transform(value: CreateContentDto) {
    const {
      title,
      description,
      category,
      videoId,
      s3Url,
      duration,
      resolution,
    } = value;

    const errors: string[] = [];

    //if (!title || title.trim() === '') errors.push('Title is required.');
    if (!description || description.trim() === '') errors.push('Description is required.');
    if (!category || category.trim() === '') errors.push('Category is required.');
    //if (!videoId || videoId.trim() === '') errors.push('Video ID is required.');
    //if (!s3Url || s3Url.trim() === '') errors.push('S3 URL is required.');
    if (!duration || typeof duration !== 'number' || duration <= 0) errors.push('Duration must be a positive number.');
    if (!resolution || resolution.trim() === '') errors.push('Resolution is required.');

    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }

    return value; // Pass through validated DTO
  }
}
