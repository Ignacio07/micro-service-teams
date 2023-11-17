import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTeamDto{
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    id_project: number;
    
}