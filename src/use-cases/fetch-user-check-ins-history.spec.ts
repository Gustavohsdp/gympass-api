import { InMemoryCheckInRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserCheckInsHistoryUseCase } from './fetch-user-check-ins-history-use-case'

let checkInsRepository: InMemoryCheckInRepository
let sut: FetchUserCheckInsHistoryUseCase

describe('Fetch User Check-in History Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInRepository()
    sut = new FetchUserCheckInsHistoryUseCase(checkInsRepository)
  })

  it('should be able to fetch check-in history', async () => {
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

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkIns).toHaveLength(3)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gymId: 'gym-01',
      }),
      expect.objectContaining({
        gymId: 'gym-02',
      }),
      expect.objectContaining({
        gymId: 'gym-03',
      }),
    ])
  })

  it('should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        userId: 'user-01',
        gymId: `gym-${i}`,
      })
    }

    const { checkIns } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gymId: 'gym-21',
      }),
      expect.objectContaining({
        gymId: 'gym-22',
      }),
    ])
  })
})
