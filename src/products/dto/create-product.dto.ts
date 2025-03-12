import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    price: number;

    @IsOptional()
    description: string;
}
