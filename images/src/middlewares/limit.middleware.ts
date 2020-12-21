import * as _ from 'lodash';
import { NextFunction, Request, Response } from 'express';
import users from '../services/users';

const imageMinute = _.toNumber(process.env.IMAGE_MINUTE) || 5

async function limitMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers['x-username']
  const user = _.get(users, `${userId}`)
  if (user && user.GET > imageMinute) {
    res.statusCode = 500
    res.send('download limit rate')
  }
  next()
}

export default limitMiddleware;
