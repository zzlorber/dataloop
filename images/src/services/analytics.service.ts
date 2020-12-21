
import * as _  from 'lodash';
import Amqp from './amqp.service';
import users from './users';

class AnalyticsService {
  amqp: Amqp

  constructor(q: string) {
    this.amqp = new Amqp(q)
    this.initialize()
  }

  async initialize() {
    await this.amqp.connect()
    await this.msgConsumer()
  }

  msgConsumer() {
    this.amqp.receiveMessage(this.saveReqDetails)
  }

  saveReqDetails(msg: string){
    const userId = msg.split(' ')[0]
    const method = msg.split(' ')[1]
    let sumReq = _.get(users, `${userId}.${method}`, 0)
    _.set(users, `${userId}.${method}`, sumReq + 1)
    console.log(`msg `, msg, users, userId, method)
  }
}

export default AnalyticsService;