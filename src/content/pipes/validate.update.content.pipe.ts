import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UpdateContentDto } from '../dto/update.content.dto';

@Injectable()
export class ValidateUpdateContentPipe implements PipeTransform {
  transform(value: UpdateContentDto) {
    const errors: string[] = [];

    if (value.duration !== undefined && (typeof value.duration !== 'number' || value.duration <= 0)) {
      errors.push('Duration must be a positive number.');
    }

    //if (value.title && typeof value.title !== 'string') errors.push('Title must be a string.');
    if (value.description && typeof value.description !== 'string') errors.push('Description must be a string.');
    if (value.tags && !Array.isArray(value.tags)) errors.push('Tags must be an array.');
    if (value.isPublished !== undefined && typeof value.isPublished !== 'boolean') {
      errors.push('isPublished must be a boolean.');
    }

    if (errors.length > 0) throw new BadRequestException(errors);
    return value;
  }
}
