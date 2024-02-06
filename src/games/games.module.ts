import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from './schemas/game.schema';
import { GameReview, GameReviewSchema } from './schemas/game-review.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Game.name,
        schema: GameSchema,
      },
      {
        name: GameReview.name,
        schema: GameReviewSchema,
      },
    ]),
  ],
  controllers: [GamesController],
  providers: [GamesService],
})
export class GamesModule {}
