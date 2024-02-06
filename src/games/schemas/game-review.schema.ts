import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { Game } from './game.schema';

@Schema({
  timestamps: true,
})
export class GameReview {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: Game.name,
  })
  game: Game;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: User.name,
  })
  user: User;

  @Prop({
    min: 1,
    max: 5,
    required: true,
  })
  rate: number;

  @Prop({
    maxlength: 500,
    reqruied: false,
  })
  comment?: string;
}

export const GameReviewSchema = SchemaFactory.createForClass(GameReview);
