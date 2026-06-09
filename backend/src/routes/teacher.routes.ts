import { Router } from 'express';
import { getTeacherBySlug, getTeacherLetters, verifyTeacherPin } from '../controllers/teacher.controller';

const router = Router();

router.get('/:slug', getTeacherBySlug);
router.get('/:slug/letters', getTeacherLetters);
router.post('/:slug/verify-pin', verifyTeacherPin);

export default router;
