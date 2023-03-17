import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { SearchGymUseCase } from '../search-gyms-use-case'

export function makeSearchGymsUseCase() {
  const prismaGymsRepository = new PrismaGymsRepository()

  const useCase = new SearchGymUseCase(prismaGymsRepository)

  return useCase
}
