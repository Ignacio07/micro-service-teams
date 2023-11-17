import { IsEmail, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";


export class CreateMemberDto{
    
    @IsEmail()
    email: string;

    @IsNumber()
    @IsNotEmpty()
    id_team: number;
}