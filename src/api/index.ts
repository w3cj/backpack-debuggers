import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import monsters from './monsters';
import images from './images';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/monsters', monsters);
router.use('/images', images);

export default router;
