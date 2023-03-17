import { verifyJWT } from '@/http/midlewares/verify-jwt'
import { verifyUserRole } from '@/http/midlewares/verify-user-role'

import { FastifyInstance } from 'fastify'
import { create } from './create.controller'
import { nearby } from './nearby.controller'
import { search } from './search.controller'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/gyms/search', search)
  app.get('/gyms/nearby', nearby)

  app.post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
    },
    create,
  )
}
