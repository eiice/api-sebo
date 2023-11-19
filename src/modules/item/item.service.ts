import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { UserFromJwt } from '../auth/models/UserFromJwt';
import { CategoryService } from '../category/category.service';
import { UnauthorizedError } from '../auth/errors/unauthorized.error';
import { UserEntity } from '../users/entity/users.entity';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { ItemEntity } from './entities/item.entity';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService, private categoryService: CategoryService) {}

  @ApiCreatedResponse({ type: ItemEntity })
  async create(createItemDto: CreateItemDto, @CurrentUser() currentUser: UserFromJwt) {
    if ( (await this.categoryService.getAllActiveCategoryNames()).includes(createItemDto.category) ) {
        return this.prisma.item.create({
            data: {
                ...createItemDto,
                status: 'for_sale',
                creationDate: JSON.stringify(new Date()),
                sellerId: currentUser.email,
            }
        });
    }

    throw new UnauthorizedException('Category does not exists.');

  }

  async findAll() {
    return this.prisma.item.findMany();
  }

  async findOne(id: string) {
    const itemById = await this.prisma.item.findUnique({
        where: {
            id
        }
    })

    return itemById;
  }

  async searchBookByName(itemName: string) {
    console.log("item name: " + itemName);
    const books = await this.prisma.item.findMany({
        where: {
            title: {
                contains: itemName.toLowerCase(),
            },
        },
    });

    if (!books || books.length === 0) {
        throw new NotFoundException('No books available contaning this title');
    }

    return books;
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    if (updateItemDto.category) {
        if ( (await this.categoryService.getAllActiveCategoryNames()).includes(updateItemDto.category) === false) {
            throw new UnauthorizedException('Category does not exists.');
        }  
    }

    const userUpdate =  this.prisma.item.update({
        where: {
            id
        },
        data: {
            ...updateItemDto
        }
    });

    if (!userUpdate) {
        throw new UnauthorizedError('Update is not in the correct format.')
    }

    return userUpdate;

    
  }

  async delete(id: string) {
    return this.prisma.item.update({
        where: { id },
        data: {
            status: 'disabled'
        }
    });
  }
}
