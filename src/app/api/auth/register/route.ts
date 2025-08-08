import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  if (!email || !password) return new Response('Missing', { status: 400 })
  const exists = await prisma.user.findUnique({ where: { email } })
  if (exists) return new Response('Email in use', { status: 400 })
  const hashed = await bcrypt.hash(password, 10)
  await prisma.user.create({ data: { email, password: hashed } })
  return Response.json({ ok: true })
}
