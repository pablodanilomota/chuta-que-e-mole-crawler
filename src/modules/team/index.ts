import { prisma } from '../../lib/prisma'

export const save = ({
  name,
  shieldUrl
}: {
  name: string
  shieldUrl: string
}) => {
  return prisma.team
    .upsert({
      create: { name, shieldUrl },
      update: { name, shieldUrl },
      where: { name }
    })
    .then(async data => {
      await prisma.$disconnect()
      return data
    })
}
