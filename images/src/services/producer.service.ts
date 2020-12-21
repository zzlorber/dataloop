import Amqp from './amqp.service';

class ProducerService {
  amqp: Amqp

  constructor(q: string) {
    this.amqp = new Amqp(q)
    this.initialize()
  }

  async initialize() {
    await this.amqp.connect()
  }

  async sendMsg(msg: string) {
    await this.amqp.sendMessage(msg)
  }
}
export default ProducerService;
