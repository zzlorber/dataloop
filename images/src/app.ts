import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import AnalyticsService from './services/analytics.service';

const queueName = process.env.queue || 'analytics'

class App {
  public app: express.Application;
  public port: (string | number);

  constructor(routes: Routes[]) {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
    this.initializeServices()
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  private initializeMiddlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use('/', route.router);
    });
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private initializeServices() {
    new AnalyticsService(queueName)
  }

  private connectToDatabase() {
    const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, MONGO_URI } = process.env;
    const options = { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false };
    console.log('MONGO_URI', MONGO_URI)
    mongoose
      .connect(MONGO_URI ? MONGO_URI : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`, { ...options })
      .catch((error: Error) => {
        console.error('[ERROR]', error);
      });
  }
}

export default App;