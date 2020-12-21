import { Router } from 'express';
import HelloController from '../controllers/hello.controller';
import Route from '../interfaces/routes.interface';

class HelloRoute implements Route {
  public path = '/hello';
  public router = Router();
  public helloController = new HelloController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.helloController.world);
  }
}

export default HelloRoute;