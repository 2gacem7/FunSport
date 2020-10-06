import { Model, Mongoose, model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Widget } from '../schemas/widget.schema';
import { CreateWidgetDto } from '../dto/create-widget.dto';



@Injectable()
export class WidgetsService {
    constructor( @InjectModel(Widget.name) private widgetModel: Model<Widget>){}

    async getMyWidgets(userId){
        const widgets = await this.widgetModel.find({'userId':userId}).exec();
        return widgets;
    }

    async addWidget(userId,widgetId, typeWidget){
        const newWidget = await this.widgetModel.create({'userId':userId, widgetId: widgetId,typeWidget:typeWidget});
        newWidget.save()
        return newWidget
    }

    async delWidget(widgetId){
        await this.widgetModel.deleteOne({'widgetId':widgetId});
        return {
            message: "Update ok"
        };
    }
}