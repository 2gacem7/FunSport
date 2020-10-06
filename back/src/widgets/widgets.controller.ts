import { Controller, Get, Delete,Post,Request, UseGuards,Put } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { WidgetsService } from './widgets.service';

@Controller('widgets')
export class WidgetsController {
    constructor(private readonly widgetsService: WidgetsService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getWidget(@Request() req) {
      const list = await this.widgetsService.getMyWidgets(req.user.id)
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async addWidget(@Request() req) {
      const list = await this.widgetsService.addWidget(req.user.id, req.body.widgetId, req.body.typeWidget)
      return list;
    }

    @UseGuards(JwtAuthGuard)
    @Delete()
    async delWidget(@Request() req) {
       await this.widgetsService.delWidget(req.body.widgetId)
       return {
        message: "Update ok"
    };
    }
}
