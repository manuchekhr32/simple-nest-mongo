import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { PaginationQueryDto } from 'src/global/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateGameReviewDto } from './dto/create-game-review.dto';

@ApiTags('Games')
@Controller('api/games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @Get('list')
  findAllGames(@Query() pagination: PaginationQueryDto) {
    return this.gamesService.findAllGames(pagination);
  }

  @Get('game/:slug')
  findGameBySlug(@Param('slug') slug: string) {
    return this.gamesService.findGameBySlug(slug);
  }

  @Post('create')
  createGame(@Body() payload: CreateGameDto) {
    return this.gamesService.createGame(payload);
  }

  @Post('reviews/create')
  createGameReview(@Body() payload: CreateGameReviewDto) {
    return this.gamesService.createGameReview(payload);
  }

  @Get('reviews')
  findAllGameReviews() {
    return this.gamesService.findGameReviews();
  }
}
