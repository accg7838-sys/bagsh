import { Router } from 'express';
import { getHomeLetter } from '../controllers/homeLetter.controller';
import { getTeachers } from '../controllers/teacher.controller';
import { getApprovedRainComments, createRainComment } from '../controllers/rainComment.controller';
import { createTeacherLetter } from '../controllers/teacherLetter.controller';

const router = Router();

router.get('/home-letter', getHomeLetter);
router.get('/teachers', getTeachers);
router.get('/rain-comments', getApprovedRainComments);
router.post('/rain-comments', createRainComment);
router.post('/teacher-letters', createTeacherLetter);

export default router;
