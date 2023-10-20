import { IsEmail, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";


export class CreateMemberDto{
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    rol: string;

    @IsNumber()
    @IsNotEmpty()
    id_team: number;
}