import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';
import { RuleSchema } from './schemas/rule.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Rule', schema: RuleSchema }])
  ],
  providers: [RuleService],
  controllers: [RuleController]
})
export class RuleModule { }
