import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma';
import { generateSlug } from '../utils/slug';
import { generateQRCode } from '../services/qr.service';
import { AuthRequest } from '../middleware/auth.middleware';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

// ─── Auth ────────────────────────────────────────────

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'Email and password required' });
    return;
  }

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const valid = await bcrypt.compare(password, admin.passwordHash);

  if (!valid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
    expiresIn: '24h',
  });

  res.json({ token, admin: { id: admin.id, name: admin.name, email: admin.email } });
}

// ─── Dashboard ───────────────────────────────────────

export async function getDashboard(_req: AuthRequest, res: Response): Promise<void> {
  const [teacherCount, rainCount, teacherLetterCount, pendingCount] = await Promise.all([
    prisma.teacher.count(),
    prisma.rainComment.count(),
    prisma.teacherLetter.count(),
    prisma.rainComment.count({ where: { status: 'PENDING' } }) +
      prisma.teacherLetter.count({ where: { status: 'PENDING' } }),
  ]);

  const recentMessages = await prisma.rainComment.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: {
      id: true,
      studentName: true,
      className: true,
      content: true,
      status: true,
      createdAt: true,
    },
  });

  res.json({
    stats: {
      teacherCount,
      rainCommentCount: rainCount,
      teacherLetterCount,
      pendingCount,
    },
    recentMessages,
  });
}

// ─── Teachers CRUD ───────────────────────────────────

const teacherSchema = z.object({
  name: z.string().min(1),
  subject: z.string().optional().nullable(),
  photoUrl: z.string().optional().nullable(),
  pinCode: z.string().optional().nullable(),
});

export async function getAdminTeachers(_req: AuthRequest, res: Response): Promise<void> {
  const teachers = await prisma.teacher.findMany({
    orderBy: { name: 'asc' },
    include: {
      _count: { select: { letters: true } },
    },
  });
  res.json(teachers);
}

export async function createTeacher(req: AuthRequest, res: Response): Promise<void> {
  const validation = teacherSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ error: 'Validation failed', details: validation.error.issues });
    return;
  }

  const slug = generateSlug(validation.data.name);

  // Ensure unique slug
  const existing = await prisma.teacher.findUnique({ where: { slug } });
  let finalSlug = slug;
  if (existing) {
    finalSlug = `${slug}-${Date.now()}`;
  }

  const teacher = await prisma.teacher.create({
    data: {
      name: validation.data.name,
      subject: validation.data.subject || null,
      photoUrl: validation.data.photoUrl || null,
      slug: finalSlug,
      pinCode: validation.data.pinCode || null,
    },
  });

  res.status(201).json(teacher);
}

export async function updateTeacher(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const validation = teacherSchema.safeParse(req.body);

  if (!validation.success) {
    res.status(400).json({ error: 'Validation failed', details: validation.error.issues });
    return;
  }

  const teacher = await prisma.teacher.findUnique({ where: { id: parseInt(id) } });

  if (!teacher) {
    res.status(404).json({ error: 'Teacher not found' });
    return;
  }

  const updated = await prisma.teacher.update({
    where: { id: parseInt(id) },
    data: {
      name: validation.data.name,
      subject: validation.data.subject || null,
      photoUrl: validation.data.photoUrl || null,
      pinCode: validation.data.pinCode || null,
    },
  });

  res.json(updated);
}

export async function deleteTeacher(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;

  const teacher = await prisma.teacher.findUnique({ where: { id: parseInt(id) } });

  if (!teacher) {
    res.status(404).json({ error: 'Teacher not found' });
    return;
  }

  await prisma.teacher.delete({ where: { id: parseInt(id) } });

  res.json({ message: 'Teacher deleted' });
}

// ─── Home Letter ─────────────────────────────────────

export async function getAdminHomeLetter(_req: AuthRequest, res: Response): Promise<void> {
  const letter = await prisma.homeLetter.findFirst({
    orderBy: { updatedAt: 'desc' },
  });
  res.json(letter);
}

export async function updateHomeLetter(req: AuthRequest, res: Response): Promise<void> {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ error: 'Title and content required' });
    return;
  }

  const existing = await prisma.homeLetter.findFirst();

  let letter;
  if (existing) {
    letter = await prisma.homeLetter.update({
      where: { id: existing.id },
      data: { title, content },
    });
  } else {
    letter = await prisma.homeLetter.create({
      data: { title, content },
    });
  }

  res.json(letter);
}

// ─── Rain Comments Management ────────────────────────

export async function getAdminRainComments(_req: AuthRequest, res: Response): Promise<void> {
  const comments = await prisma.rainComment.findMany({
    orderBy: { createdAt: 'desc' },
  });
  res.json(comments);
}

export async function approveRainComment(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const comment = await prisma.rainComment.update({
    where: { id: parseInt(id) },
    data: { status: 'APPROVED' },
  });
  res.json(comment);
}

export async function rejectRainComment(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const comment = await prisma.rainComment.update({
    where: { id: parseInt(id) },
    data: { status: 'REJECTED' },
  });
  res.json(comment);
}

export async function deleteRainComment(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  await prisma.rainComment.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Comment deleted' });
}

// ─── Teacher Letters Management ──────────────────────

export async function getAdminTeacherLetters(_req: AuthRequest, res: Response): Promise<void> {
  const letters = await prisma.teacherLetter.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      teacher: { select: { name: true, slug: true } },
    },
  });
  res.json(letters);
}

export async function approveTeacherLetter(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const letter = await prisma.teacherLetter.update({
    where: { id: parseInt(id) },
    data: { status: 'APPROVED' },
  });
  res.json(letter);
}

export async function rejectTeacherLetter(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  const letter = await prisma.teacherLetter.update({
    where: { id: parseInt(id) },
    data: { status: 'REJECTED' },
  });
  res.json(letter);
}

export async function deleteTeacherLetter(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;
  await prisma.teacherLetter.delete({ where: { id: parseInt(id) } });
  res.json({ message: 'Letter deleted' });
}

// ─── QR Code ─────────────────────────────────────────

export async function getTeacherQR(req: AuthRequest, res: Response): Promise<void> {
  const { id } = req.params;

  const teacher = await prisma.teacher.findUnique({
    where: { id: parseInt(id) },
  });

  if (!teacher) {
    res.status(404).json({ error: 'Teacher not found' });
    return;
  }

  const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
  const teacherUrl = `${frontendUrl}/teacher/${teacher.slug}`;
  const qrDataUrl = await generateQRCode(teacherUrl);

  res.json({
    teacher: { id: teacher.id, name: teacher.name, slug: teacher.slug },
    url: teacherUrl,
    qrCode: qrDataUrl,
  });
}
