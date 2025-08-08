import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
async function main() {
  const password = await bcrypt.hash('test1234', 10);
  await prisma.user.upsert({ where: { email: 'creator@example.com' }, update: {}, create: { email: 'creator@example.com', password, role: 'CREATOR' } });
  await prisma.game.upsert({ where: { id: '123456' }, update: { name: 'Zombie Strike' }, create: { id: '123456', name: 'Zombie Strike' } });
  await prisma.event.create({ data: { gameId: '123456', userId: (await prisma.user.findFirst({ where: { email: 'creator@example.com' } })).id, title: 'Double XP', description: 'x2 xp', startsAt: new Date(), endsAt: new Date(Date.now()+3600e3), linkUrl: 'https://www.roblox.com/games/123456' } });
}
main().finally(()=>prisma.$disconnect())
