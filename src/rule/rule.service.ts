import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRuleDTO } from './dto/rule.dto';
import { Rule } from './interfaces/rule.interface';

@Injectable()
export class RuleService {
    constructor(@InjectModel('Rule') private readonly ruleModel: Model<Rule>) { }

    // create rule
    async createRule(createRuleCTO: CreateRuleDTO): Promise<Rule> {
        const rule = new this.ruleModel(createRuleCTO);
        return rule.save();
    }

    // get rule by ID
    async getRule(ruleID: string): Promise<Rule> {
        const rule = await this.ruleModel.findOne({ _id: ruleID });
        return rule;
    }

    // delete all
    async deleteRules() {
        const rules = await this.ruleModel.deleteMany({});
        return rules;
    }

    //get list rule server side
    async getListRule(body: any): Promise<any> {
        let { start, length, filter } = body;
        let order = body.columns[body.order[0]["column"]].data;
        let order_val = body.order[0]["dir"];
        let { name, type, from_date, to_date, status, priority } = filter;
        let condition = {
            name: { $regex: `.*${name}.*` },
            type: { $regex: `.*${type}.*` }
        };
        if (priority) {
            condition['priority'] = priority;
        }
        if (from_date) {
            condition['from_date'] = { $gte: from_date };
        }
        if (to_date) {
            condition['to_date'] = { $lte: to_date };
        }
        if (status !== 'ALL') {
            condition['active'] = (status === 'true');
        }
        const rules = await this.ruleModel.find(condition).sort({ [order]: order_val }).skip(start).limit(length);
        return rules;
    }

    async getRecordsTotal(body: any) {
        let { filter } = body;
        let { name, type, from_date, to_date, status, priority } = filter;
        let condition = {
            name: { $regex: `.*${name}.*` },
            type: { $regex: `.*${type}.*` }
        };
        if (priority) {
            condition['priority'] = priority;
        }
        if (from_date) {
            condition['from_date'] = { $gte: from_date };
        }
        if (to_date) {
            condition['to_date'] = { $lte: to_date };
        }
        if (status !== 'ALL') {
            condition['active'] = (status === 'true');
        }
       
        const recordsTotal = await this.ruleModel.find(condition).countDocuments();
        return recordsTotal;
    }

    // update rule
    async updateRuleByID(ruleID: string, createRuleCTO: CreateRuleDTO): Promise<Rule> {
        const updateRule = await this.ruleModel.findByIdAndUpdate(ruleID, createRuleCTO, { new: true });
        return updateRule;
    }

    // delete rule
    async deleteRuleByID(ruleID: string): Promise<any> {
        const deleteRule = await this.ruleModel.updateOne({ _id: ruleID }, {
            $set: {
                active: false
            }
        })
        return deleteRule;
    }
}
