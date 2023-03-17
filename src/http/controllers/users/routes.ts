import { verifyJWT } from '@/http/midlewares/verify-jwt'

import { FastifyInstance } from 'fastify'

import { authenticate } from './authenticate.controler'
import { profile } from './profile.controller'
import { refresh } from './refresh.controller'
import { register } from './register.controller'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** Authenticated **/
  app.get(
    '/me',
    {
      onRequest: [verifyJWT],
    },
    profile,
  )
}
