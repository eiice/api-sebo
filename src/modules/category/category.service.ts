import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from '../prisma/prisma.service';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {

    return this.prisma.category.create({
        data: {
            ...createCategoryDto,
            status: 'active',
        }
    });

  }

  findAll() {
    return this.prisma.category.findMany();
  }

  findOne(id: string) {
    return this.prisma.category.findUnique({
        where: { id }
    });
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
        where: { id },
        data: {
            ...updateCategoryDto
        }
    });
  }

  delete(id: string) {
    return this.prisma.category.update({
        where: { id },
        data: {
            status: 'disabled'
        }
    });
  }

  async getAllActiveCategoryNames() {
    try {
      const activeCategories = await this.prisma.category.findMany({
        where: { status: 'active' },
        select: {
          name: true,
        },
      });
  
      const categoryNames = activeCategories.map((category) => category.name);
      
      return categoryNames;

    } catch (error) {
      throw new Error(`Error fetching category names: ${error}`);
    }
  }
}
