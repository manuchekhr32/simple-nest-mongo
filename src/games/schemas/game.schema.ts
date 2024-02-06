import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import slugify from 'slugify';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Game {
  @Prop({ required: true })
  name: string;

  @Prop({
    required: false,
    unique: true,
    lowercase: true,
  })
  slug: string;

  @Prop({
    required: true,
  })
  url: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
GameSchema.pre('save', function (next) {
  if ('name' in this) {
    this.slug = slugify(this.name, {
      strict: true,
      lower: true,
    });
  }
  next();
});
