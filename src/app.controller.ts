import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

// import { Engine } from 'json-rules-engine'
let RuleEngine = require('json-rules-engine');


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/home')
  @Render('home')
  home() {
    return {title: "Home Page"};
  }


  @Get('/rule')
  testRulesEngine() : void {
    let engine = new RuleEngine.Engine()
   
    let event = {
      type: 'young-adult-rocky-mnts',
      params: {
        giftCard: 'amazon',
        value: 50
      }
    };

    let conditions = {
      all: [
        {
          fact: 'age',
          operator: 'greaterThanInclusive',
          value: 18
        },
        {
          fact: 'age',
          operator: 'lessThanInclusive',
          value: 25
        }
      ]
    }

    let rule = new RuleEngine.Rule({ conditions, event});
    engine.addRule(rule);

    // call when success rule
    rule.on('success', function(event, almanac, ruleResult) {
      console.log('success');
      console.log(event) // { type: 'my-event', params: { id: 1 }
    })

    // call when failure rule
    engine.on('failure', function(event, almanac, ruleResult) {
      console.log('failed')
      console.log(event) // { type: 'my-event', params: { id: 1 }
    })

    // run test
    let fact = { age: 214};

    engine
      .run(fact)
      .then((results) => {
        console.log('age is ');
        results.events.map(event => console.log(event.params.value))
      })
      .catch(err => console.log(err))
  }
}
