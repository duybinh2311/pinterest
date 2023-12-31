import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'nestjs-prisma'

import { AuthUser } from 'src/auth/decorators/auth-user.decorator'
import { SortOrderEnum } from 'src/common/dto/app-query.dto'
import { IRes, IResList } from 'src/common/types/app.types'

import { PinPaginationQueryDto, PinQueryDto } from './dto/pin-query.dto'
import { CreatePinDto, UpdatePinDto } from './dto/pin-req.dto'
import { PinResDto, SavePinResDto } from './dto/pin-res.dto'
import { PinMessages } from './types/pin.messages'

@Injectable()
export class PinService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreatePinDto, authUser: AuthUser): IRes<PinResDto> {
    const pin = await this.prisma.pin.create({
      data: {
        ...dto,
        authorId: authUser.userId,
      },
      include: {
        author: {
          select: {
            fullName: true,
            avatar: true,
            userName: true,
          },
        },
      },
    })

    return {
      data: pin,
      message: PinMessages.CREATE_SUCCESS,
    }
  }

  async save(id: number, authUser: AuthUser): IRes<SavePinResDto> {
    const pin = (await this.getById(id)).data

    const savedPin = await this.prisma.saved.findUnique({
      where: {
        userId_pinId: {
          userId: authUser.userId,
          pinId: pin.id,
        },
      },
    })

    if (savedPin) {
      await this.prisma.saved.delete({
        where: {
          userId_pinId: {
            userId: authUser.userId,
            pinId: pin.id,
          },
        },
      })

      return {
        data: null,
        message: PinMessages.UNSAVE_SUCCESS,
      }
    }

    const savePin = await this.prisma.saved.create({
      data: {
        userId: authUser.userId,
        pinId: pin.id,
      },
    })

    return {
      data: savePin,
      message: PinMessages.SAVE_SUCCESS,
    }
  }

  async getAll(query: PinQueryDto): IResList<PinResDto> {
    const data = await this.prisma.pin.findMany({
      orderBy: {
        [query.sortBy]: query.sortOrder,
      },
      include: {
        author: {
          select: {
            fullName: true,
            avatar: true,
            userName: true,
          },
        },
      },
    })

    return {
      count: data.length,
      data,
      message: PinMessages.GET_ALL_SUCCESS,
    }
  }

  async getPagination(query: PinPaginationQueryDto): IResList<PinResDto> {
    const data = await this.prisma.pin.findMany({
      take: query.pageSize,
      skip: (query.page - 1) * query.pageSize,
      orderBy: {
        createdAt: query.sortOrder,
      },
      include: {
        author: {
          select: {
            fullName: true,
            avatar: true,
            userName: true,
          },
        },
      },
    })

    return {
      count: data.length,
      data,
      message: PinMessages.GET_PAGINATION_SUCCESS,
    }
  }

  async getById(id: number): IRes<PinResDto> {
    const pin = await this.prisma.pin.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            fullName: true,
            avatar: true,
            userName: true,
          },
        },
      },
    })

    if (!pin) throw new NotFoundException(PinMessages.NOT_FOUND)

    return {
      data: pin,
      message: PinMessages.GET_ID_SUCCESS,
    }
  }

  async getCreatedPins(authUser: AuthUser): IResList<PinResDto> {
    const data = await this.prisma.pin.findMany({
      where: { authorId: authUser.userId },
      include: {
        author: {
          select: {
            fullName: true,
            avatar: true,
            userName: true,
          },
        },
      },
      orderBy: {
        createdAt: SortOrderEnum.DESC,
      },
    })

    return {
      count: data.length,
      data,
      message: PinMessages.GET_CREATED_PINS_SUCCESS,
    }
  }

  async getSavedPins(authUser: AuthUser): IResList<PinResDto> {
    const data = await this.prisma.saved.findMany({
      where: {
        userId: authUser.userId,
      },
      include: {
        pin: true,
        user: {
          select: {
            avatar: true,
            fullName: true,
            userName: true,
          },
        },
      },
      orderBy: {
        createdAt: SortOrderEnum.DESC,
      },
    })

    return {
      count: data.length,
      data: data.map((saved) => ({ ...saved.pin, author: saved.user })),
      message: PinMessages.GET_SAVED_PINS_SUCCESS,
    }
  }

  async update(id: number, dto: UpdatePinDto): IRes<PinResDto> {
    const pin = await this.prisma.pin.update({
      where: { id },
      data: dto,
      include: {
        author: {
          select: {
            fullName: true,
            avatar: true,
            userName: true,
          },
        },
      },
    })

    return {
      data: pin,
      message: PinMessages.UPDATE_SUCCESS,
    }
  }

  async delete(id: number): IRes<null> {
    await this.prisma.pin.delete({
      where: { id },
    })

    return {
      data: null,
      message: PinMessages.DELETE_SUCCESS,
    }
  }
}
