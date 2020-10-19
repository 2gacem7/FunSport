import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { PronosticsModule } from './MyPronostics/pronostics.module';

import { AuthModule } from './auth/auth.module';
import { MySportsController } from './MySports/MySports.controller';
import { MySportsModule } from './MySports/MySports.module';
import { MyFavoritesController } from './MyFavorites/MyFavorites.controller';
import { MyFavoritesModule } from './MyFavorites/MyFavorites.module';
import { SportsModule } from './sports/sports.module';
import { NewsModule } from './news/news.module';
import { NewsController } from './news/news.controller';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/funsport'), UsersModule, AuthModule,MySportsModule, MyFavoritesModule, SportsModule, PronosticsModule, NewsModule],
  controllers: [AppController,MySportsController,MyFavoritesController],
  providers: [AppService],
})
export class AppModule {}
