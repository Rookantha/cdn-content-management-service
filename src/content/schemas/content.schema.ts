import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

export type ContentDocument = Content & Document;

@Schema({ timestamps: true })
@ObjectType()
export class Content {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ type: [String], default: [] })
  @Field(() => [String], { nullable: true })
  tags?: string[];

  @Prop({ required: true })
  @Field()
  category: string;

  @Prop({ default: false })
  @Field()
  isPublished: boolean;

  @Prop({ required: true })
  @Field()
  videoId: string;

  @Prop({ required: true })
  @Field()
  s3Url: string;

  @Prop({ required: true })
  @Field(() => Int)
  duration: number;

  @Prop({ required: true })
  @Field()
  resolution: string;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
