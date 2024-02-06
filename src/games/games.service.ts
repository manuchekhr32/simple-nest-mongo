import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './schemas/game.schema';
import { Model } from 'mongoose';
import { GameReview } from './schemas/game-review.schema';
import { PaginationQueryDto } from 'src/global/dto/pagination.dto';
import { CreateGameReviewDto } from './dto/create-game-review.dto';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<Game>,
    @InjectModel(GameReview.name) private gameReviewModel: Model<GameReview>,
  ) {}

  async findAllGames(pagination: PaginationQueryDto) {
    const [total, data] = await Promise.all([
      this.gameModel.countDocuments(),
      this.gameModel
        .aggregate([
          {
            $lookup: {
              from: 'gamereviews',
              localField: '_id',
              foreignField: 'game',
              as: 'reviews',
            },
          },
          {
            $addFields: {
              averageRating: { $avg: '$reviews.rate' },
            },
          },
          {
            $project: {
              _id: '$_id',
              name: '$name',
              slug: '$slug',
              url: '$url',
              averageRating: true,
            },
          },
        ])
        .limit(parseInt(pagination?.limit || '10'))
        .skip(parseInt(pagination?.offset || '0'))
        .sort({
          name: 'asc',
        }),
    ]);
    return { total, data };
  }

  async findGameBySlug(slug: string) {
    const game = await this.gameModel.findOne({ slug }).populate('reviews');
    if (!game) throw new NotFoundException('Game not found');
    return game;
  }

  async createGame(payload: CreateGameDto) {
    try {
      const created = await this.gameModel.create(payload);
      return created;
    } catch (err: unknown) {
      const error = err as any;
      throw new BadRequestException(error.errors);
    }
  }

  // Reviews
  findGameReviews() {
    return this.gameReviewModel.where().populate('user').populate('game');
  }

  async createGameReview(payload: CreateGameReviewDto) {
    try {
      const created = await this.gameReviewModel.create({
        user: payload.userId,
        comment: payload.comment,
        rate: payload.rate,
        game: payload.gameId,
      });
      return created;
    } catch (err: unknown) {
      const error = err as any;
      throw new BadRequestException(error.errors);
    }
  }
}
