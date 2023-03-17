import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { RegisterUseCase } from './register-use-case'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.execute({
      email: 'jhondoe@email.com',
      name: 'Jhon Doe',
      password: '654321',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user passwird upon registration', async () => {
    const { user } = await sut.execute({
      email: 'jhondoe@email.com',
      name: 'Jhon Doe',
      password: '654321',
    })

    const isPasswordCorrectlyHashed = await compare(
      '654321',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice ', async () => {
    const email = 'jhondoe@email.com'

    await sut.execute({
      email,
      name: 'Jhon Doe',
      password: '654321',
    })

    await expect(() =>
      sut.execute({
        email,
        name: 'Jhon Doe',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
