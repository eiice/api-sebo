import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ValidationPipe, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItemEntity } from './entities/item.entity';

@Controller('item')
@ApiTags('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard)
  @ApiResponse({ 
    type: ItemEntity
  })
  @Post()
  create(@Body(new ValidationPipe({ transform: true })) createItemDto: CreateItemDto, @CurrentUser() currentUser: UserFromJwt) {
    return this.itemService.create(createItemDto, currentUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('search')
  async search(@Query('itemName') itemName: string) {
    return this.itemService.searchBookByName(itemName);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(id, updateItemDto);
  }


  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.itemService.delete(id);
  }
}
