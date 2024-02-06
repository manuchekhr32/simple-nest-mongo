import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { GamesModule } from './games/games.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs'),
    UsersModule,
    GamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
