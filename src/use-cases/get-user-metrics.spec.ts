import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics-use-case'

let checkInsRepository: InMemoryCheckInRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new GetUserMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins from metrics', async () => {
    await checkInsRepository.create({
      userId: 'user-01',
      gymId: 'gym-01',
    })

    await checkInsRepository.create({
      userId: 'user-01',
      gymId: 'gym-02',
    })

    await checkInsRepository.create({
      userId: 'user-01',
      gymId: 'gym-03',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(3)
  })
})
