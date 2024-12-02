const { PrismaClient } = require('@prisma/client');
const birthdays = require('./data/birthdays.json');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed database...');

  const authorId = '674dbef75a99df6552ee7a10';

  for (const birthday of birthdays) {
    try {
      await prisma.post.create({
        data: {
          name: birthday.name,
          date: new Date(birthday.dob),
          semester: birthday.sem,
          department: birthday.dept,
          authorId: authorId
        }
      });
      console.log(`Created birthday entry for ${birthday.name}`);
    } catch (error) {
      console.error(`Error creating entry for ${birthday.name}:`, error);
    }
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
