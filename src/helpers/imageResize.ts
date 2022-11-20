import sharp from 'sharp';

const resizeImage = async (
  inPath: string,
  outPath: string,
  width: number,
  height: number
): Promise<string> => {
  try {
    await sharp(inPath)
      .resize({
        width: width,
        height: height,
      })
      .toFile(outPath);
    return '';
  } catch {
    return 'Oops..There is a problem resizing the image :(( )...';
  }
};

export default resizeImage;
