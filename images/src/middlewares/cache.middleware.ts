import { NextFunction, Request, Response } from 'express';
import memCache from '../services/memCache.service'

async function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
    let key = `image${req.params.id}`
    let cacheContent = memCache.get(key);
    if (cacheContent) {
        res.send(cacheContent);
        return
    }
    next()
}

export default cacheMiddleware;
