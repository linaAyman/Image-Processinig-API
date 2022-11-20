import resizeImage from '../helpers/imageResize';
import path from 'path';
import { existsSync } from 'fs';

describe('test resize function', () => {
  const testFilename = 'santamonica';
  const width = 200;
  const height = 100;
  const inPath =
    path.resolve('./') + `/assets/images/original/${testFilename}.jpg`;
  const outPath = path.resolve('./') + '/assets/images/thumbnails/';
  const outFilename: string | undefined =
    outPath + testFilename + '-(' + width + ',' + height + ').jpg';

  it('test the output of the resize function', async () => {
    await resizeImage(inPath, outFilename, width, height);
    expect(existsSync(outFilename)).toBeTrue;
  });
});
