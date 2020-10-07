import { Body, Controller, Get, HttpStatus, NotFoundException, Post, Query, Res } from '@nestjs/common';
import { CheckRuleDTO } from './dto/checkrule.dto';
import { CreateRuleDTO } from './dto/rule.dto';
import { RuleService } from './rule.service';


let RuleEngine = require('json-rules-engine');

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

    @Post('/check')
    async checkRule(@Res() res, @Body() checkRuleDTO: CheckRuleDTO, @Query('ruleID') ruleID) {
        const findRule = await this.ruleService.getRule(ruleID);

        let event = JSON.parse(findRule.actions);

        let engine = new RuleEngine.Engine()

        // let event = {
        //     type: 'young-adult-rocky-mnts',
        //     params: {
        //         giftCard: 'amazon',
        //         value: 50
        //     }
        // };

        let conditions = (findRule.conditions);

        // let conditions = {
        //     all: [
        //         {
        //             fact: 'age',
        //             operator: 'greaterThanInclusive',
        //             value: 18
        //         },
        //         {
        //             fact: 'age',
        //             operator: 'lessThanInclusive',
        //             value: 25
        //         }
        //     ]
        // }

        // let rule = new RuleEngine.Rule({ conditions, event });
        // engine.addRule(rule);

        // // call when success rule
        // rule.on('success', function (event, almanac, ruleResult) {
        //     console.log('success');
        //     console.log(event) // { type: 'my-event', params: { id: 1 }
        // })

        // // call when failure rule
        // engine.on('failure', function (event, almanac, ruleResult) {
        //     console.log('failed')
        //     console.log(event) // { type: 'my-event', params: { id: 1 }
        // })

        // // run test
        // let fact = { age: 214 };

        // engine
        //     .run(fact)
        //     .then((results) => {
        //         //to do
        //         // console.log('age is ');
        //         // results.events.map(event => console.log(event.params.value))
        //     })
        //     .catch(err => console.log(err))

        return res.status(HttpStatus.OK).json({
            findRule,
            conditions,
            checkRuleDTO
        })
    }

}
