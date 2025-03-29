import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

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
}

export const ContentSchema = SchemaFactory.createForClass(Content);
