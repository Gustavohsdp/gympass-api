import { verifyJWT } from '@/http/midlewares/verify-jwt'
import { verifyUserRole } from '@/http/midlewares/verify-user-role'

import { FastifyInstance } from 'fastify'
import { create } from './create-controller'
import { history } from './history-controller'
import { metrics } from './metrics-controller'
import { validate } from './validate-controller'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)

  app.post('/gyms/:gymId/check-ins', create)
  app.patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [verifyUserRole('ADMIN')],
    },
    validate,
  )
}
