import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRuleDTO } from './dto/rule.dto';
import { Rule } from './interfaces/rule.interface';


@Injectable()
export class RuleService {
    constructor(@InjectModel('Rule') private readonly ruleModel: Model<Rule>) {}

    // get all rule
    async getAllRule() : Promise<Rule[]> {
        const rules = await this.ruleModel.find();
        return rules;
    }

    // create rule
    async createRule(createRuleCTO: CreateRuleDTO) : Promise<Rule> {
        const rule = new this.ruleModel(createRuleCTO);
        return rule.save();
    }

    // get rule by ID
    async getRule(ruleID: string) : Promise<Rule> {
        const rule = await this.ruleModel.findById(ruleID);
        return rule;
    } 
}
