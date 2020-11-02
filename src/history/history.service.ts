import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHistoryDTO } from './dto/history.dto';
import { HistoryUpdate } from './interfaces/history.interface';

@Injectable()
export class HistoryService {
    constructor(@InjectModel('History') private readonly historyModel: Model<HistoryUpdate>) { }

    async create(createHistoryDTO: CreateHistoryDTO): Promise<HistoryUpdate> {
        const history = new this.historyModel(createHistoryDTO);
        return history.save();
    }

    async getListByRuleId(ruleId: String): Promise<HistoryUpdate[]> {
        const histories = await this.historyModel.find({rule_id: ruleId}).sort({createdAt: 'desc'});
        return histories;
    }

}
