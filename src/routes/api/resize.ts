import express from 'express';
import { promises as fs } from 'fs';
import { existsSync } from 'fs';
import path from 'path';
import resizeImage from '../../helpers/imageResize';
const resize: express.Router = express.Router();

resize.get('/', async (req: express.Request, res: express.Response) => {
  const filename: string = req.query.filename as string;
  const width = parseInt(String(req.query.width)) as number;
  const height = parseInt(String(req.query.height)) as number;

  const inPath = path.resolve('./') + `/assets/images/original/${filename}.jpg`;
  const outPath = path.resolve('./') + '/assets/images/thumbnails/';

  const outFilename: string | undefined =
    outPath + filename + '-(' + width + ',' + height + ').jpg';
  const existInPath: boolean = existsSync(inPath);
  const existOutPath: boolean = existsSync(outFilename);

  //checking for different cases validity
  //1-missing filename
  if (!filename) {
    return res
      .status(400)
      .send(
        '<h2>Missing parameters, please use at least a valid filename query params in the url</h2>'
      );
  }
  //2-filename and no width or height
  else if (filename && !req.query.width && !req.query.height) {
    //check if filename exists in originals folder
    if (!existInPath) {
      return res.status(404).send('<h2>NO image Found with that name...</h2>');
    } else {
      return res.status(200).sendFile(inPath);
    }
  }
  //3-filename, width and height exist
  else if (filename && req.query.width && req.query.height) {
    //check if filename exists in originals folder
    if (!existInPath) {
      return res.status(404).send('<h2>NO image Found with that name...</h2>');
    }
    //check on width and height validity
    if (
      width < 1 ||
      Number.isNaN(width) ||
      height < 1 ||
      Number.isNaN(height)
    ) {
      return res
        .status(400)
        .send('<h2>Value for width/height must be a positive nuber...</h2>');
    }
    //check if thumbnails folder created if not create it
    try {
      await fs.access(outPath);
    } catch {
      fs.mkdir(outPath);
    }
    //check if thumbnail with same name already exists else resize and create a new thumb
    if (!existOutPath) {
      await resizeImage(inPath, outFilename, width, height);
    }

    //return the thumb
    return res.status(200).sendFile(outFilename) as void;
  }
  //4-error of missing width or height parameter
  else {
    return res
      .status(400)
      .send('<h2>Missing parameters, please insert both width and height</h2>');
  }
});

export default resize;
