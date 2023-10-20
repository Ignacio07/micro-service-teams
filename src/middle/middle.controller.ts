/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Param } from '@nestjs/common';
import { MiddleService } from './middle.service';
import { Post, Body } from '@nestjs/common';
import { NewTeamDto } from './dto/new.team.dto';

@Controller('middle')
export class MiddleController { 
    constructor(private readonly middleService: MiddleService) {}

    @Post('new-team')
    async newTeam(@Body() newTeamDto: NewTeamDto){
        return await this.middleService.newTeam(newTeamDto);
    }

    @Post('get-team-names')
    async getTeamNames(@Body() data: { email: string }){
        return await this.middleService.getTeamNames(data);
    }

    /*@Post('change-team-name')
    async changeTeamName(@Body() data: { id: number, name: string }){
        return await this.middleService.changeTeamName(data);
    }*/
}
