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
@Module({
  imports: [MongooseModule.forRoot('mongodb://mongo/funsport'), UsersModule, AuthModule,MySportsModule, MyFavoritesModule, SportsModule, PronosticsModule],
  controllers: [AppController,MySportsController,MyFavoritesController],
  providers: [AppService],
})
export class AppModule {}
