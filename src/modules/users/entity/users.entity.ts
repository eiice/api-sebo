import { ApiProperty } from "@nestjs/swagger";
import { Item, User } from "@prisma/client";

export class UserEntity implements User {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    email: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    status: string;
    @ApiProperty()
    type: string;
    @ApiProperty( { required: false, nullable: true } )
    area: string | null;
    @ApiProperty()
    items: Item
}