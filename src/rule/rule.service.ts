import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRuleDTO } from './dto/rule.dto';
import { Rule } from './interfaces/rule.interface';


@Injectable()
export class RuleService {
    constructor(@InjectModel('Rule') private readonly ruleModel: Model<Rule>) { }

    // get all rule
    async getAllRule(): Promise<Rule[]> {
        const rules = await this.ruleModel.find();
        return rules;
    }

    // create rule
    async createRule(createRuleCTO: CreateRuleDTO): Promise<Rule> {
        const rule = new this.ruleModel(createRuleCTO);
        return rule.save();
    }

    // get rule by ID
    async getRule(ruleID: string): Promise<Rule> {
        const rule = await this.ruleModel.findById(ruleID);
        return rule;
    }

    // delete all
    async deleteRules() {
        const rules = await this.ruleModel.deleteMany({});
        return rules;
    }

    //get list rule server side
    async getListRule(body: any): Promise<any> {
        let { start, length, draw } = body;
        let { value } = body.search;
        let order = body.columns[body.order[0]["column"]].data;
        let order_val = body.order[0]["dir"];
        
        if (value !== '') {
            const rules = await this.ruleModel.find({
                $or: [
                    { name: { $regex: `.*${value}.*` } },
                    { desription: { $regex: `.*${value}.*` } }
                ]
            })
            .sort({ order: order_val})
                .skip(start)
                .limit(length);
            return rules;
        }
        else {
            const rules = await this.ruleModel.find({})
            .sort({order: order_val})
                .skip(start)
                .limit(length);
            return rules;
        }
    }
    
    async getRecordsTotal() {
        const recordsTotal = Number(await this.ruleModel.find({}).countDocuments());
        return recordsTotal;
    }
}
