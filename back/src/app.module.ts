import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WidgetsController } from './widgets/widgets.controller';
import { WidgetsModule } from './widgets/widgets.module';
import { AboutController } from './about/about.controller';
@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/funsport'), UsersModule, AuthModule, WidgetsModule],
  controllers: [AppController, WidgetsController,AboutController],
  providers: [AppService],
})
export class AppModule {}
