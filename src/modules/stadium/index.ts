import { prisma } from '../../lib/prisma'

export const save = ({ name, address }: { name: string; address: string }) => {
  return prisma.stadium
    .upsert({
      create: { name, address },
      update: { name, address },
      where: { name }
    })
    .then(async data => {
      await prisma.$disconnect()
      return data
    })
}
