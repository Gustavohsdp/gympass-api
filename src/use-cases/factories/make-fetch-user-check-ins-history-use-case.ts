import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history-use-case'
import { PrismaCheckInsRepository } from './../../repositories/prisma/prisma-check-ins-repository'

export function makeFetchUserCheckInsHistoryUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new FetchUserCheckInsHistoryUseCase(prismaCheckInsRepository)

  return useCase
}
