import { Router } from 'express';
import * as multer from 'multer';
import ImageController from '../controllers/image.controller';
import Route from '../interfaces/routes.interface';
import analyticsMiddleware from '../middlewares/analytics.middleware';
import cacheMiddleware from '../middlewares/cache.middleware';
import limitMiddleware from '../middlewares/limit.middleware';

const UPLOAD_PATH = 'uploads';
const upload = multer({ });
class HelloRoute implements Route {
  public path = '/image';
  public router = Router();
  public helloController = new ImageController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, analyticsMiddleware, upload.single('image'), this.helloController.upload);
    this.router.get(`${this.path}/:id`, analyticsMiddleware, limitMiddleware, cacheMiddleware, this.helloController.view);
    this.router.delete(`${this.path}/:id`, analyticsMiddleware, this.helloController.deleteImage);
  }
}

export default HelloRoute;