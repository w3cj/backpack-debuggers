import express from 'express';
import { eq } from 'drizzle-orm';
import { ZodError, z } from 'zod';

import { Monster, SelectMonster } from '../db/schema';
import { db } from '../db/drizzle';

const router = express.Router();

router.get<{}, SelectMonster[]>('/', async (req, res, next) => {
  try {
    const monsters = await db.query.Monster.findMany();
    return res.json(monsters);
  } catch (error) {
    return next(error);
  }
});

const GetOneMonsterParams = z.object({
  dex_number: z.coerce.number(),
});
type GetOneMonsterParams = z.infer<typeof GetOneMonsterParams>;

router.get<GetOneMonsterParams, SelectMonster>(
  '/:dex_number',
  async (req, res, next) => {
    try {
      const params = GetOneMonsterParams.parse(req.params);
      const monster = await db.query.Monster.findFirst({
        where: eq(Monster.dex_number, params.dex_number),
      });
      if (monster) {
        return res.json(monster);
      }
      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next();
      }
      return next(error);
    }
  },
);

export default router;
