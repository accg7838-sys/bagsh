import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const createRainCommentSchema = z.object({
  studentName: z.string().min(1).max(50),
  className: z.string().max(20).optional().nullable(),
  content: z.string().min(5).max(500),
});

export async function getApprovedRainComments(_req: Request, res: Response): Promise<void> {
  const comments = await prisma.rainComment.findMany({
    where: { status: 'APPROVED' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      studentName: true,
      className: true,
      content: true,
      createdAt: true,
    },
  });
  res.json(comments);
}

export async function createRainComment(req: Request, res: Response): Promise<void> {
  const validation = createRainCommentSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ error: 'Validation failed', details: validation.error.issues });
    return;
  }

  const comment = await prisma.rainComment.create({
    data: {
      studentName: validation.data.studentName,
      className: validation.data.className || null,
      content: validation.data.content,
      status: 'PENDING',
    },
  });

  res.status(201).json({ message: 'Comment submitted for approval', comment });
}
