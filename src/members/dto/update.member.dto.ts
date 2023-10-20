import { IsEmail, IsNumber, IsString } from "class-validator";

export class UpdateMemberDto{
    
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