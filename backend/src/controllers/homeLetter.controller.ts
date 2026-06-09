import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export async function getHomeLetter(_req: Request, res: Response): Promise<void> {
  const letter = await prisma.homeLetter.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
  res.json(letter);
}
