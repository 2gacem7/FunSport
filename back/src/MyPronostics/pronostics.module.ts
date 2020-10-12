import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PronosticsController } from './pronostics.controller';
import { PronosticsService } from './pronostics.service';;
import { Pronostic, PronosticSchema } from '../schemas/pronostic.schema';


@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pronostic.name, schema: PronosticSchema }]),

  ],
  controllers: [PronosticsController],
  providers: [PronosticsService],
  exports: [PronosticsService],
})
export class PronosticsModule { }
