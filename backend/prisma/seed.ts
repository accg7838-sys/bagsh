import { PrismaClient, MessageStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.teacherLetter.deleteMany();
  await prisma.rainComment.deleteMany();
  await prisma.homeLetter.deleteMany();
  await prisma.teacher.deleteMany();
  await prisma.admin.deleteMany();

  // Create admin
  const passwordHash = await bcrypt.hash('admin123', 10);
  await prisma.admin.create({
    data: {
      name: 'Админ',
      email: 'admin@teacher.mn',
      passwordHash,
    },
  });
  console.log('✓ Admin created (admin@teacher.mn / admin123)');

  // Create teachers
  const teachers = await Promise.all([
    prisma.teacher.create({
      data: {
        name: 'Батболд багш',
        subject: 'Математик',
        slug: 'batbold-bagsh',
        pinCode: '1234',
      },
    }),
    prisma.teacher.create({
      data: {
        name: 'Сарантуяа багш',
        subject: 'Монгол хэл',
        slug: 'sarantuya-bagsh',
        pinCode: '1234',
      },
    }),
    prisma.teacher.create({
      data: {
        name: 'Оюун багш',
        subject: 'Англи хэл',
        slug: 'oyun-bagsh',
        pinCode: '1234',
      },
    }),
  ]);
  console.log(`✓ ${teachers.length} teachers created`);

  // Create home letter
  await prisma.homeLetter.create({
    data: {
      title: 'Багш нартаа баярлалаа',
      content: `Эрхэм хүндэт багш нартаа,

Та бүхэндээ чин сэтгэлийн талархал илэрхийлье. Биднийг мэдлэгтэй, зөв хүн болж төлөвшиходөд өдөр бүр сэтгэл гарган зааж, зөвлөж, дэмжиж байдагт баярлалаа.

Таны заасан хичээл бүр, хэлсэн зөвлөгөө бүр, өгсөн урам бүр бидний ирээдүйд гэрэл нэмдэг. Бидний амжилтын ард багш таны хичээл зүтгэл үргэлж байдаг.

Багш нартаа баярлалаа.`,
    },
  });
  console.log('✓ Home letter created');

  // Create sample rain comments (pre-approved)
  const comments = [
    { studentName: 'Анужин', className: '10А', content: 'Багш нартаа маш их баярлалаа.' },
    { studentName: 'Тэмүүлэн', className: '11Б', content: 'Та бүхний ачаар бид илүү ихийг сурч байна.' },
    { studentName: 'Мөнхжин', className: '9В', content: 'Биднийг үргэлж дэмждэгт баярлалаа.' },
    { studentName: 'Нарантуяа', className: '10А', content: 'Багш таны хичээл зүтгэлд баярлалаа.' },
    { studentName: 'Билгүүн', className: '12А', content: 'Таны ачаар би математикт дуртай болсон.' },
    { studentName: 'Солонго', className: '8В', content: 'Багшдаа үргэлж талархаж явдаг.' },
    { studentName: 'Энхболд', className: '11Б', content: 'Та бидэнд зөвхөн хичээл биш, амьдралыг заасан.' },
    { studentName: 'Дөлгөөн', className: '9А', content: 'Багшийнхаа хөдөлмөрийг үнэлж баршгүй.' },
    { studentName: 'Хүслэн', className: '10В', content: 'Таны зөвлөгөө бүр надад ихийг өгсөн.' },
    { studentName: 'Төгөлдөр', className: '12Б', content: 'Сургуулийн сайхан дурсамжуудын ард та байдаг.' },
    { studentName: 'Ариунжаргал', className: '7А', content: 'Багш хүн бол үнэхээр агуу мэргэжил.' },
    { studentName: 'Сүхбат', className: '8В', content: 'Багш таны халуун сэтгэлд баярлалаа.' },
  ];

  for (const comment of comments) {
    await prisma.rainComment.create({
      data: { ...comment, status: 'APPROVED' },
    });
  }
  console.log(`✓ ${comments.length} rain comments created`);

  // Create sample teacher letters
  const letters = [
    { teacherId: teachers[0].id, studentName: 'Анужин', className: '10А', content: 'Батболд багш та надад математикийг ойлгуулж өгсөнд баярлалаа.' },
    { teacherId: teachers[0].id, studentName: 'Тэмүүлэн', className: '11Б', content: 'Таны хичээл үргэлж сонирхолтой байдаг.' },
    { teacherId: teachers[0].id, studentName: 'Билгүүн', className: '12А', content: 'Багш таны ачаар би олимпиадад амжилттай оролцсон.' },
    { teacherId: teachers[1].id, studentName: 'Мөнхжин', className: '9В', content: 'Сарантуяа багш таны заасан Монгол хэлний хичээл надад ихийг өгсөн.' },
    { teacherId: teachers[1].id, studentName: 'Солонго', className: '8В', content: 'Таны ачаар би зөв бичиж сурсан.' },
    { teacherId: teachers[2].id, studentName: 'Нарантуяа', className: '10А', content: 'Оюун багш таны англи хэлний хичээл маш сонирхолтой.' },
    { teacherId: teachers[2].id, studentName: 'Хүслэн', className: '10В', content: 'Таны ачаар би англиар чөлөөтэй ярьдаг болсон.' },
  ];

  for (const letter of letters) {
    await prisma.teacherLetter.create({
      data: { ...letter, status: 'APPROVED' },
    });
  }
  console.log(`✓ ${letters.length} teacher letters created`);

  console.log('\n🎉 Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
