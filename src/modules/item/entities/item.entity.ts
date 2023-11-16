import { ApiProperty } from "@nestjs/swagger";
import { Item } from "@prisma/client";


export class ItemEntity implements Item {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    author: string;
    @ApiProperty()
    category: string;
    @ApiProperty({type: 'number', format: 'double'})
    price: number
    @ApiProperty()
    description: string
    @ApiProperty()
    status: string;
    @ApiProperty({type: 'string', format: 'date'})
    creationDate: string
    @ApiProperty()
    periodicity: string;
    @ApiProperty()
    sellerId: string;
}
