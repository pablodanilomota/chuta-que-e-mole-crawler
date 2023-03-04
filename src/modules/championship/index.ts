import { prisma } from '../../lib/prisma'

export const save = ({ name }: { name: string }) => {
  return prisma.championship
    .upsert({
      create: { name },
      update: { name },
      where: { name }
    })
    .then(async data => {
      await prisma.$disconnect()
      return data
    })
}
