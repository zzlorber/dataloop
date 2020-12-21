import 'dotenv/config';
import App from './app';
import HelloRoute from './routes/hello.route';
import ImageRoute from './routes/image.route';

const app = new App([
  new HelloRoute(),
  new ImageRoute()
]);

app.listen();
