import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Post, Put, Query, Res } from '@nestjs/common';
import { CreateRuleDTO } from './dto/rule.dto';
import { RuleService } from './rule.service';

@Controller('rule')
export class RuleController {
    constructor(private ruleService: RuleService) { }


    @Get('/all')
    async getAllRule(@Res() res) {
        const rule = await this.ruleService.getAllRule();
        return res.status(HttpStatus.OK).json(rule);
    }

    @Post('/create')
    async createRule(@Res() res, @Body() createRuleDTO: CreateRuleDTO) {
        const createRule = await this.ruleService.createRule(createRuleDTO);
        if (!createRule) throw new NotFoundException("Create failed");
        return res.status(HttpStatus.OK).json({
            createRule
        })
    }

    // Drop
    @Delete('/delete_all')
    async deleteAll(@Res() res) {
        const deleteRules = await this.ruleService.deleteRules();
        return res.status(HttpStatus.OK).json({
            deleteRules
        })
    }

    @Post('/list')
    async getListRule(@Res() res, @Body() body: any) {
        console.log(body);
        let { draw } = body;
        const data = await this.ruleService.getListRule(body);
        console.log(data);
        const recordsTotal = await this.ruleService.getRecordsTotal();
        return res.status(HttpStatus.OK).json({
            data,
            recordsTotal,
            recordsFiltered: recordsTotal,
            draw
        })
    }


}
