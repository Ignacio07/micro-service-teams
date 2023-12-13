import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateTeamDto{
    
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    id_project: number;
    
}