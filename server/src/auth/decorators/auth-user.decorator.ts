import { Request } from 'express'

import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export interface AuthUser {
  userId: number
}

export const AuthUser = createParamDecorator((_: unknown, context: ExecutionContext) => {
  const req: Request = context.switchToHttp().getRequest()
  return req.user as AuthUser
})
