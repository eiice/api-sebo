import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { CategoryService } from '../category/category.service';

@Module({
  controllers: [ItemController],
  providers: [ItemService, CategoryService],
  imports: [PrismaModule]
})
export class ItemModule {}
