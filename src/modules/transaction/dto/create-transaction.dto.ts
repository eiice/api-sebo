import { ApiProperty } from "@nestjs/swagger";
import { IsEmpty, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsString()
    @ApiProperty()
    id: string;
    @IsEmpty()
    @ApiProperty()
    sellerId: string;
    @IsEmpty()
    @ApiProperty()
    buyerId: string;
    @IsString()
    @ApiProperty()
    itemId: string;
    @IsEmpty()
    @ApiProperty({ type: 'string', format: 'date' })
    creationDate: string;
    @IsNumber()
    @ApiProperty()
    transactionValue: number;
}
