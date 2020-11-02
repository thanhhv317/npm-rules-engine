import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { HistorySchema } from './schemas/history.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'History', schema: HistorySchema }])
    ],
    providers: [HistoryService],
    controllers: [HistoryController]
})
export class HistoryModule { }
