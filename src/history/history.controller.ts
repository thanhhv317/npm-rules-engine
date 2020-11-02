import { Controller, HttpStatus, NotFoundException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {

    constructor(private _historyService: HistoryService) { }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    async history(@Req() req, @Res() res) {
        try {
            let { action } = req.body;
            switch (action) {
                case 'create': {
                    let {data} = req.body;
                    const history = this._historyService.create(data);
                    if (!history) throw new NotFoundException("Create failed");
                    return res.status(HttpStatus.OK).json({
                        history
                    })
                }
                case 'histories': {
                    let {ruleId} = req.body;
                    const histories = await this._historyService.getListByRuleId(ruleId);
                    return res.status(HttpStatus.OK).json({
                        histories
                    });
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
