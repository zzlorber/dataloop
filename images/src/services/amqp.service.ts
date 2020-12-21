import { connect, Connection } from 'amqplib';

type CbFunc = (msg: string) => void

class AmqpService {
  conn: Connection
  connPath: string = process.env.CONN_PATH || 'amqp://rabbitmq:rabbitmq@localhost'
  q: string

  constructor(q: string) {
    this.q = q
  }

  async connect() {
    try {
      this.conn = await connect(this.connPath)
      console.log('Rabbitmq Connection Success')
    } catch (error) {
      throw new Error(error)
    }
  }

  async createChannel() {
    return this.conn.createChannel()
  }

  public async sendMessage(msg: string) {
    const channel = await this.createChannel()
    await channel.assertQueue(this.q)
    channel.sendToQueue(this.q, Buffer.from(msg));
  }

  public async receiveMessage(func: CbFunc) {
    const channel = await this.createChannel()
    await channel.assertQueue(this.q)
    console.log(`Consume for ${this.q}`)

    return channel.consume(this.q, function (msg) {
      if (msg !== null) {
        func(msg.content.toString())
        channel.ack(msg)
      }
    });
  }
}

export default AmqpService;
