import { Body, Controller, HttpStatus, NotFoundException, Post, Res } from '@nestjs/common';
import { RuleService } from './rule.service';

@Controller('rules')
export class RuleController {
    constructor(private ruleService: RuleService) { }

    @Post('')
    async handleData(@Res() res, @Body() body: any) {
        try {
            let { action } = body;
            switch (action) {
                case 'get_list': {
                    let { draw, start, length } = body;
                    const data = await this.ruleService.getListRule(body);
                    const recordsTotal = await this.ruleService.getRecordsTotal(body);
                    return res.status(HttpStatus.OK).json({
                        data,
                        recordsTotal,
                        recordsFiltered: recordsTotal,
                        draw,
                        start,
                        length
                    })
                }
                case 'create': {
                    let { createRuleDTO } = body;
                    const createRule = await this.ruleService.createRule(createRuleDTO);
                    if (!createRule) throw new NotFoundException("Create failed");
                    return res.status(HttpStatus.OK).json({
                        createRule
                    })
                }
                case 'get_rule': {
                    let { ruleID } = body;
                    const rule = await this.ruleService.getRule(ruleID);
                    if (!rule) throw new NotFoundException("Rule does not exit!");
                    return res.status(HttpStatus.OK).json(rule);
                }
                case 'update': {
                    let { ruleID, createRuleDTO } = body;
                    const updateRule = await this.ruleService.updateRuleByID(ruleID, createRuleDTO);
                    if (!updateRule) throw new NotFoundException("Rule does not exit!")
                    return res.status(HttpStatus.OK).json({
                        updateRule
                    })
                }
                case 'delete': {
                    let { ruleID } = body;
                    const deleteRule = await this.ruleService.deleteRuleByID(ruleID);
                    if (!deleteRule) throw new NotFoundException("Rule does not exit!");
                    return res.status(HttpStatus.OK).json({
                        deleteRule
                    })
                }
            }
        }
        catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'error/500'
            })
        }
    }

}
