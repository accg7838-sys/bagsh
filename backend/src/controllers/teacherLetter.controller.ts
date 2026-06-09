import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const createTeacherLetterSchema = z.object({
  teacherId: z.number().int().positive(),
  studentName: z.string().min(1).max(50),
  className: z.string().max(20).optional().nullable(),
  content: z.string().min(5).max(500),
});

export async function createTeacherLetter(req: Request, res: Response): Promise<void> {
  const validation = createTeacherLetterSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ error: 'Validation failed', details: validation.error.issues });
    return;
  }

  // Verify teacher exists
  const teacher = await prisma.teacher.findUnique({
    where: { id: validation.data.teacherId },
  });

  if (!teacher) {
    res.status(404).json({ error: 'Teacher not found' });
    return;
  }

  const letter = await prisma.teacherLetter.create({
    data: {
      teacherId: validation.data.teacherId,
      studentName: validation.data.studentName,
      className: validation.data.className || null,
      content: validation.data.content,
      status: 'PENDING',
    },
  });

  res.status(201).json({ message: 'Letter submitted for approval', letter });
}
