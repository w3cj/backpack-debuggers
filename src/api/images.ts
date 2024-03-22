import { promises as fs } from 'fs';
import path from 'path';
import express from 'express';
import im from 'imagemagick';
import { ZodError, z } from 'zod';

const router = express.Router();

const ImageParams = z.object({
  dex_number: z.coerce.number(),
  size: z.coerce
    .number()
    .min(50, 'Minimum size is 50.')
    .max(500, 'Maximum size is 500.'),
});
type ImageParams = z.infer<typeof ImageParams>;

router.get<ImageParams>(
  '/monster/:dex_number/size/:size/image.png',
  async (req, res, next) => {
    try {
      const { dex_number, size } = ImageParams.parse(req.params);
      const requestedImagePath = path.join(
        process.cwd(),
        'resize-image-cache',
        `${dex_number.toString()}-${size}.png`,
      );
      try {
        await fs.access(requestedImagePath, fs.constants.R_OK);
        return res.sendFile(requestedImagePath);
      } catch (error) {
        // resized image does not exist
      }
      const sourceImagePath = path.join(
        process.cwd(),
        'sprites',
        dex_number.toString() + '.png',
      );
      await fs.access(sourceImagePath, fs.constants.R_OK);
      const exceptionHandler = (error: Error) => {
        res.status(500);
        if (error.message.includes('spawn convert ENOENT')) {
          return next(new Error('imagemagick is not installed'));
        }
        return next(error);
      };
      process.on('uncaughtException', exceptionHandler);
      im.resize(
        {
          srcPath: sourceImagePath,
          dstPath: requestedImagePath,
          width: size,
        },
        (err) => {
          process.off('uncaughtException', exceptionHandler);
          if (err) {
            res.status(500);
            next(err);
          }
          return res.sendFile(requestedImagePath);
        },
      );
    } catch (e) {
      const error = e as Error;
      if (error.message.includes('ENOENT: no such file or directory')) {
        return next();
      }
      res.status(500);
      if (error instanceof ZodError) {
        const message = error.issues.map((issue) => issue.message).join('\n');
        return next(new Error(message));
      }
      return next(e);
    }
  },
);

export default router;
