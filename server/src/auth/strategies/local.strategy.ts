import * as bcrypt from 'bcrypt'
import { Strategy } from 'passport-local'

import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'

import { UserService } from 'src/user/user.service'

import { AuthUser } from '../decorators/auth-user.decorator'
import { AuthMessages } from '../types/auth.messages'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    })
  }

  async validate(email: string, password: string): Promise<AuthUser> {
    const user = await this.userService.getByEmail(email)

    if (!user) {
      throw new NotFoundException(AuthMessages.EMAIL_NOT_FOUND)
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException(AuthMessages.PASSWORD_INCORRECT)
    }

    return { userId: user.id }
  }
}
