import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [PrismaService]
})
export class TransactionModule {}
