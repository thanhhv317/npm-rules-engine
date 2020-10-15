import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put, Query, Res, Param } from '@nestjs/common';
import { CreateRuleDTO } from './dto/rule.dto';
import { RuleService } from './rule.service';

@Controller('rule')
export class RuleController {
    constructor(private ruleService: RuleService) { }

    @Post('/create')
    async createRule(@Res() res, @Body() createRuleDTO: CreateRuleDTO) {
        const createRule = await this.ruleService.createRule(createRuleDTO);
        if (!createRule) throw new NotFoundException("Create failed");
        return res.status(HttpStatus.OK).json({
            createRule
        })
    }

    // Delete all with status is DELETE
    @Delete('/delete_all')
    async deleteAll(@Res() res) {
        const deleteRules = await this.ruleService.deleteRules();
        return res.status(HttpStatus.OK).json({
            deleteRules
        })
    }

    @Post('/list')
    async getListRule(@Res() res, @Body() body: any) {
        try {
            console.log(body);
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
        } catch (e) {
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                message: 'error/500'
            })
        }

    }

    @Get('/:ruleID')
    async getRule(@Res() res, @Param('ruleID') ruleID: string) {
        const rule = await this.ruleService.getRule(ruleID);
        if (!rule) throw new NotFoundException("Rule does not exit!");
        return res.status(HttpStatus.OK).json(rule);
    }

    @Put('/update')
    async updateRule(@Res() res, @Query('ruleID') ruleID: string, @Body() createRuleDTO: CreateRuleDTO) {
        const updateRule = await this.ruleService.updateRuleByID(ruleID, createRuleDTO);
        if (!updateRule) throw new NotFoundException("Rule does not exit!")
        return res.status(HttpStatus.OK).json({
            updateRule
        })
    }

    @Delete('/')
    async deleteRule(@Res() res, @Query('ruleID') ruleID: string) {
        const deleteRule = await this.ruleService.deleteRuleByID(ruleID);
        if (!deleteRule) throw new NotFoundException("Rule does not exit!");
        return res.status(HttpStatus.OK).json({
            deleteRule
        })
    }

}
