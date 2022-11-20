import express from 'express';
import resize from './api/resize';

const routes: express.Router = express.Router();

routes.use('/resize', resize);

routes.get('/', (req: express.Request, res: express.Response): void => {
  res.send(
    '<h1>Hello! This is an image processing api. Please use query with filename only (no resize) or filename with width and height (to resize)</h1>' +
      '<h2>Available Filenames: [encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica]</h2>' +
      '<h3>Example: localhost:300/api/resize?filename=santamonica -->No Resize</h3>' +
      '<h3>OR: localhost:300/api/resize?filename=santamonica&width=100&height=50 -->Resize</h3>'
  );
});

export default routes;
