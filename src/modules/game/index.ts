import { prisma } from '../../lib/prisma'

export const save = async ({
  eventType,
  startDate,
  championshipId,
  stadiumId,
  teamAwayId,
  teamHomeId
}: {
  eventType: string
  startDate: Date
  championshipId: number
  stadiumId: number
  teamAwayId: number
  teamHomeId: number
}) => {
  const foundGame = await prisma.game.findFirst({
    where: { startDate, teamAwayId, teamHomeId }
  })

  if (foundGame) return

  return prisma.game
    .create({
      data: {
        eventType,
        startDate,
        championshipId,
        stadiumId,
        teamAwayId,
        teamHomeId
      }
    })
    .then(async data => {
      await prisma.$disconnect()
      return data
    })
}
