import { NextFunction, Request, Response } from 'express';
import ProducerService from '../services/producer.service'

const queueName = process.env.queue || 'analytics'
const producerService = new ProducerService(queueName)

async function analyticsMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers['x-username']
  const method = req.method
  producerService.sendMsg(`${userId} ${method}`)
  next()
}

export default analyticsMiddleware;
