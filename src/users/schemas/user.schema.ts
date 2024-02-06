import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { GameReview } from 'src/games/schemas/game-review.schema';
import { Game } from 'src/games/schemas/game.schema';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  username: string;

  @Prop({
    min: 12,
    max: 100,
    required: false,
  })
  age?: number;

  @Prop()
  skills?: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
