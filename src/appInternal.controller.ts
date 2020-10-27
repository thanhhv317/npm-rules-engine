import { Controller, Get, HttpStatus, Render, Res } from '@nestjs/common';
import { resolve } from 'path';
import { AppInternalService } from './appInternal.service';

@Controller()
export class AppInternalController {
  constructor(private readonly appInternalService: AppInternalService) {}

  @Get('*')
  root(@Res() res) {
    return res.sendFile(resolve('./public/dist/my-app/index.html'));;
  }

}
