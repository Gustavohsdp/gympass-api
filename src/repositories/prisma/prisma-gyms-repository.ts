import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { findManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async create(data: Prisma.GymUncheckedCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }

  async findById(gymId: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async searchMany(query: string, page: number) {
    const skip = (page - 1) * 20
    const take = 20

    const gyms = await prisma.gym.findMany({
      where: {
        title: { contains: query, mode: 'insensitive' },
      },
      take,
      skip,
    })

    return gyms
  }

  async findManyNearby({ latitude, longitude }: findManyNearbyParams) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT
      *
    FROM
      gyms
    WHERE
      (
        6371 * ACOS(
          COS(
            RADIANS(${latitude})
          ) * COS(
            RADIANS(latitude)
          ) * COS(
            RADIANS(longitude) - RADIANS(${longitude})
          ) + SIN(
            RADIANS(${latitude})
          ) * SIN(
            RADIANS(latitude)
          )
        )
      ) <= 10
  `

    return gyms
  }
}
