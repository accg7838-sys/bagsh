import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import {
  login,
  getDashboard,
  getAdminTeachers,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAdminHomeLetter,
  updateHomeLetter,
  getAdminRainComments,
  approveRainComment,
  rejectRainComment,
  deleteRainComment,
  getAdminTeacherLetters,
  approveTeacherLetter,
  rejectTeacherLetter,
  deleteTeacherLetter,
  getTeacherQR,
} from '../controllers/admin.controller';

const router = Router();

// Public
router.post('/login', login);

// Protected
router.use(authMiddleware);

router.get('/dashboard', getDashboard);

router.get('/teachers', getAdminTeachers);
router.post('/teachers', createTeacher);
router.put('/teachers/:id', updateTeacher);
router.delete('/teachers/:id', deleteTeacher);

router.get('/home-letter', getAdminHomeLetter);
router.put('/home-letter', updateHomeLetter);

router.get('/rain-comments', getAdminRainComments);
router.patch('/rain-comments/:id/approve', approveRainComment);
router.patch('/rain-comments/:id/reject', rejectRainComment);
router.delete('/rain-comments/:id', deleteRainComment);

router.get('/teacher-letters', getAdminTeacherLetters);
router.patch('/teacher-letters/:id/approve', approveTeacherLetter);
router.patch('/teacher-letters/:id/reject', rejectTeacherLetter);
router.delete('/teacher-letters/:id', deleteTeacherLetter);

router.get('/teachers/:id/qr', getTeacherQR);

export default router;
