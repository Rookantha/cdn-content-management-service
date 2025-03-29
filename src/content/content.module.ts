import { Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentResolver } from './content.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Content, ContentSchema } from './schemas/content.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Content.name, schema: ContentSchema }])],
  providers: [ContentService, ContentResolver]
})
export class ContentModule {}
