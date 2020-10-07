import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RuleModule } from './rule/rule.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://thanh:Thanh200698@cluster0-shard-00-00-hg2tr.mongodb.net:27017,cluster0-shard-00-01-hg2tr.mongodb.net:27017,cluster0-shard-00-02-hg2tr.mongodb.net:27017/finviet?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true
  }),
    RuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
