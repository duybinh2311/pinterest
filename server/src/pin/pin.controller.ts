import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { AuthUser } from 'src/auth/decorators/auth-user.decorator'

import { PinPaginationQueryDto, PinQueryDto } from './dto/pin-query.dto'
import { CreatePinDto, UpdatePinDto } from './dto/pin-req.dto'
import { PinResDto, SavePinResDto } from './dto/pin-res.dto'
import { AuthorPinGuard } from './guards/author-pin.guard'
import { PinService } from './pin.service'
import { PinMessages } from './types/pin.messages'

@ApiTags('Pin')
@Controller('pin')
export class PinController {
  constructor(private readonly pinService: PinService) {}

  @ApiOperation({ summary: PinMessages.CREATE_SUMMARY })
  @ApiCreatedResponse({ description: PinMessages.CREATE_SUCCESS, type: PinResDto })
  @Post('create')
  create(@Body() dto: CreatePinDto, @AuthUser() authUser: AuthUser) {
    return this.pinService.create(dto, authUser)
  }

  @ApiOperation({ summary: PinMessages.SAVE_SUMMARY })
  @ApiCreatedResponse({ description: PinMessages.SAVE_SUCCESS, type: SavePinResDto })
  @Post('save/:id')
  save(@Param('id') id: string, @AuthUser() authUser: AuthUser) {
    return this.pinService.save(+id, authUser)
  }

  @ApiOperation({ summary: PinMessages.GET_ALL_SUMMARY })
  @ApiOkResponse({ description: PinMessages.GET_ALL_SUCCESS, type: [PinResDto] })
  @Get()
  getAll(@Query() query: PinQueryDto) {
    return this.pinService.getAll(query)
  }

  @ApiOperation({ summary: PinMessages.GET_PAGINATION_SUMMARY })
  @ApiOkResponse({ description: PinMessages.GET_PAGINATION_SUCCESS, type: [PinResDto] })
  @Get('pagination')
  getPagination(@Query() query: PinPaginationQueryDto) {
    return this.pinService.getPagination(query)
  }

  @ApiOperation({ summary: PinMessages.GET_ID_SUMMARY })
  @ApiOkResponse({ description: PinMessages.GET_ID_SUCCESS, type: PinResDto })
  @Get(':id')
  getById(@Param('id') id: string) {
    return this.pinService.getById(+id)
  }

  @UseGuards(AuthorPinGuard)
  @ApiOperation({ summary: PinMessages.UPDATE_SUMMARY })
  @ApiOkResponse({ description: PinMessages.UPDATE_SUCCESS, type: PinResDto })
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePinDto) {
    return this.pinService.update(+id, dto)
  }

  @UseGuards(AuthorPinGuard)
  @ApiOperation({ summary: PinMessages.DELETE_SUMMARY })
  @ApiOkResponse({ description: PinMessages.DELETE_SUCCESS })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.pinService.delete(+id)
  }
}
