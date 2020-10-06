import { Module } from '@nestjs/common';
import { MyFavoritesService } from './MyFavorites.service';
import { MyFavoritesController } from './MyFavorites.controller';
import { MyFavorite, MyFavoriteSchema } from '../schemas/myFavorite.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{ name: MyFavorite.name, schema: MyFavoriteSchema }])],
  providers: [MyFavoritesService],
  controllers: [MyFavoritesController],
  exports: [MyFavoritesService],
})
export class MyFavoritesModule {}
