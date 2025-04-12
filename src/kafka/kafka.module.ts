import { Module } from '@nestjs/common';
import { KafkaConsumerService } from './kafka.service'
import { ContentModule } from 'src/content/content.module';
import { ContentService } from 'src/content/content.service';

@Module({
  imports:[ContentModule],
  providers: [KafkaConsumerService]
})
export class KafkaModule {}
