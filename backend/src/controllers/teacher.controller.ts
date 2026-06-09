import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { generateSlug } from '../utils/slug';

export async function getTeachers(_req: Request, res: Response): Promise<void> {
  const teachers = await prisma.teacher.findMany({
    orderBy: { name: 'asc' },
    select: {
      id: true,
      name: true,
      subject: true,
      photoUrl: true,
      slug: true,
    },
  });
  res.json(teachers);
}

export async function getTeacherBySlug(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;
  const teacher = await prisma.teacher.findUnique({
    where: { slug },
    select: {
      id: true,
      name: true,
      subject: true,
      photoUrl: true,
      slug: true,
    },
  });

  if (!teacher) {
    res.status(404).json({ error: 'Teacher not found' });
    return;
  }

  res.json(teacher);
}

export async function getTeacherLetters(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;
  const teacher = await prisma.teacher.findUnique({ where: { slug } });

  if (!teacher) {
    res.status(404).json({ error: 'Teacher not found' });
    return;
  }

  const letters = await prisma.teacherLetter.findMany({
    where: {
      teacherId: teacher.id,
      status: 'APPROVED',
    },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      studentName: true,
      className: true,
      content: true,
      createdAt: true,
    },
  });

  res.json({ teacher, letters });
}

export async function verifyTeacherPin(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;
  const { pinCode } = req.body;

  const teacher = await prisma.teacher.findUnique({
    where: { slug },
    select: { pinCode: true },
  });

  if (!teacher) {
    res.status(404).json({ error: 'Teacher not found' });
    return;
  }

  if (!teacher.pinCode) {
    res.json({ verified: true, message: 'No PIN required' });
    return;
  }

  if (teacher.pinCode === pinCode) {
    res.json({ verified: true });
  } else {
    res.status(401).json({ verified: false, error: 'Incorrect PIN' });
  }
}
