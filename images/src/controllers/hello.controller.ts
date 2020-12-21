import { NextFunction, Request, Response } from 'express';

class HelloController {
  world(req: Request, res: Response, next: NextFunction) {
    try {
      res.send('world');
    } catch (error) {
      next(error);
    }
  }
}

export default HelloController;
