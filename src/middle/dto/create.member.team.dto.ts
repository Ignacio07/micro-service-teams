import { IsEmail, IsNotEmpty, IsNumber, IsString, isString } from "class-validator";


export class CreateMemberTeamDto{
    
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()
    id: string;
}