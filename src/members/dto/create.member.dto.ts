import { IsEmail, IsNumber, IsString, isString } from "class-validator";


export class CreateMemberDto{
    
    @IsEmail()
    email: string;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;

    @IsString()
    rol: string;

    @IsNumber()
    id_team: number;
}