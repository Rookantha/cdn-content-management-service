import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateContentDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Field()
  category: string;

  @Field({ defaultValue: false })
  isPublished: boolean;

  @Field()
  videoId: string;

  @Field()
  s3Url: string;

  @Field(() => Int)
  duration: number;

  @Field()
  resolution: string;
}
