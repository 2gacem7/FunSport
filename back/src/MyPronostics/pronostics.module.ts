import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PronosticsController } from './pronostics.controller';
import { PronosticsService } from './pronostics.service';;
import { Pronostic, PronosticSchema } from '../schemas/pronostic.schema';
import { User, UserSchema } from '../schemas/user.schema';


import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pronostic.name, schema: PronosticSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersModule,
  ],
  controllers: [PronosticsController],
  providers: [PronosticsService],
  exports: [PronosticsService],
})
export class PronosticsModule { }
