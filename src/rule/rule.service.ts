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
        const rules = await this.ruleModel.deleteMany({ status: "DELETE" });
        return rules;
    }

    //get list rule server side
    async getListRule(body: any): Promise<any> {
        let { start, length } = body;
        let { value } = body.search;
        let order = body.columns[body.order[0]["column"]].data;
        let order_val = body.order[0]["dir"];
        const rules = await this.ruleModel.find({
            $or: [
                { name: { $regex: `.*${value}.*` } },
                { description: { $regex: `.*${value}.*` } }
            ]
        })
            .sort({ [order]: order_val })
            .skip(start)
            .limit(length);
        return rules;
    }

    async getRecordsTotal(search: string) {
        const recordsTotal = Number(await this.ruleModel.find({
            $or: [
                { name: { $regex: `.*${search}.*` } },
                { description: { $regex: `.*${search}.*` } }
            ]
        }).countDocuments());
        return recordsTotal;
    }

    // get list rule filter
    async getListRuleFilter(body: any): Promise<any> {
        let { status, to, from, start, length } = body;
        if (status === 'ALL') {
            if (to !== '' && from !== '') {
                const rules = await this.ruleModel.find({
                    from: {
                        $gte: from
                    },
                    to: {
                        $lte: to
                    }
                })
                return rules;
            }
            else {
                const rules = await this.ruleModel.find({})
                return rules;
            }
        } else {
            if (to !== '' && from !== '') {
                const rules = await this.ruleModel.find({
                    status: status,
                    from: {
                        $gte: from
                    },
                    to: {
                        $lte: to
                    }
                })
                return rules;
            } 
            else {
                const rules = await this.ruleModel.find({
                    status: status
                })
                return rules;
            }
        }
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
                status: "DELETE"
            }
        })
        return deleteRule;
    }
}
