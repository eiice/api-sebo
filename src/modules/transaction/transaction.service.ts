import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  create(createTransactionDto: CreateTransactionDto) {
    return this.prisma.transaction.create({
        data: {
            ...createTransactionDto,
            creationDate: JSON.stringify(new Date())
        }
    })

  }

  findAll() {
    return this.prisma.transaction.findMany();
  }

  findOne(id: string) {
    return this.prisma.transaction.findUnique({
        where: {
            id 
        }
    });
  }
}
