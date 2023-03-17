import { ValidateCheckInUseCase } from '../validate-check-in-use-case'
import { PrismaCheckInsRepository } from './../../repositories/prisma/prisma-check-ins-repository'

export function makeValidateCheckInUseCase() {
  const prismaCheckInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInUseCase(prismaCheckInsRepository)

  return useCase
}
