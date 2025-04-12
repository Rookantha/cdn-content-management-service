import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateContentDto {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  isPublished?: boolean;

  @Field({ nullable: true })
  videoId?: string;

  @Field({ nullable: true })
  s3Url?: string;

  @Field(() => Int, { nullable: true })
  duration?: number;

  @Field({ nullable: true })
  resolution?: string;
}
