import { Body, Controller, HttpStatus, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RuleService } from './rule.service';

@Controller('rules')
export class RuleController {
    
    constructor(private ruleService: RuleService) { }


    @UseGuards(JwtAuthGuard)
    @Post('')
    async handleData(@Res() res, @Body() body: any, @Req() req) {
        try {
            let { level } = req.user;
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
                case 'get_rule': {
                    let { ruleID } = body;
                    const rule = await this.ruleService.getRule(ruleID);
                    if (!rule) throw new NotFoundException("Rule does not exist!");
                    return res.status(HttpStatus.OK).json(rule);
                }
                case 'create': {
                    if (level !== 1) {
                        return res.status(HttpStatus.UNAUTHORIZED).json({
                            message: 'You does not permission!'
                        });
                    }
                    let { createRuleDTO } = body;
                    const createRule = await this.ruleService.createRule(createRuleDTO);
                    if (!createRule) throw new NotFoundException("Create failed");
                    return res.status(HttpStatus.OK).json({
                        createRule
                    })
                }
                case 'update': {
                    if (level !== 1) {
                        return res.status(HttpStatus.UNAUTHORIZED).json({
                            message: 'You does not permission!'
                        });
                    }
                    let { ruleID, createRuleDTO } = body;
                    const updateRule = await this.ruleService.updateRuleByID(ruleID, createRuleDTO);
                    if (!updateRule) throw new NotFoundException("Rule does not exist!")
                    return res.status(HttpStatus.OK).json({
                        updateRule
                    })
                }
                case 'delete': {
                    if (level !== 1) {
                        return res.status(HttpStatus.UNAUTHORIZED).json({
                            message: 'You does not permission!'
                        });
                    }
                    let { ruleID } = body;
                    const deleteRule = await this.ruleService.deleteRuleByID(ruleID);
                    if (!deleteRule) throw new NotFoundException("Rule does not exist!");
                    return res.status(HttpStatus.OK).json({
                        deleteRule
                    })
                }
                default: {
                    return;
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
