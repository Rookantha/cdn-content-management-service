import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateContentDto {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true }) // <-- Ensure it's an array
  tags?: string[];

  @Field()
  category: string;

  @Field({ defaultValue: false })
  isPublished: boolean;
}

@InputType()
export class UpdateContentDto {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true }) // <-- Ensure it's an array
  tags?: string[];

  @Field({ nullable: true })
  category?: string;

  @Field({ nullable: true })
  isPublished?: boolean;
}
