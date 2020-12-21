import { NextFunction, Request, Response } from 'express';
import ImageModel from '../models/image.model';
import memCache from '../services/memCache.service'

class ImageController {
  async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const base64Encoded = req.file.buffer.toString('base64')
      const filename = req.file.filename
      await ImageModel.create({
        filename,
        value: base64Encoded
      })
      res.sendStatus(200)
    } catch (error) {
      next(error);
    }
  }

  async view(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id
      const image = await ImageModel.findOne({ id })
      const value = image.value.toString()
      memCache.put(`image${id}`,value, 36000);

      res.send(value);
    } catch (error) {
      next(error);
    }
  }

  async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      await ImageModel.deleteOne({ id: req.params.id })
      res.send('image deleted');
    } catch (error) {
      next(error);
    }
  }
}

export default ImageController;
