import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { ContentService } from '../content/content.service';
import { CreateContentDto } from '../content/dto/create.content.dto';

@Injectable()
export class KafkaConsumerService implements OnModuleInit {
  private readonly kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
  });
  private readonly consumer: Consumer = this.kafka.consumer({ groupId: 'content-group' });
  private readonly logger = new Logger(KafkaConsumerService.name);

  constructor(private readonly contentService: ContentService) {}

  async onModuleInit() {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic: process.env.KAFKA_TOPIC || 'content-transcoded', fromBeginning: false });

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.logger.log(`📥 Received: ${message.value?.toString()}`);

        try {
          const payload = JSON.parse(message.value!.toString());

          if (payload.event === 'VIDEO_UPLOADED') {
            const createContentDto: CreateContentDto = {
              title: payload.title,
              description: `Video uploaded with ID: ${payload.videoId}`,
              videoId: payload.videoId,
              s3Url: payload.s3Url,
              duration: parseInt(payload.duration),
              resolution: payload.resolution,
              category: 'Video',
              tags: [],
              isPublished: false,
            };

            await this.contentService.create(createContentDto);
            this.logger.log(`✅ Content created for videoId: ${payload.videoId}`);
          }
        } catch (error) {
          this.logger.error('❌ Failed to process Kafka message', error);
        }
      },
    });
  }
}
