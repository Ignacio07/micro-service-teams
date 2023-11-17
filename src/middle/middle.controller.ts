/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { MiddleService } from './middle.service';
import { Post, Body } from '@nestjs/common';


@Controller('middle')
export class MiddleController { 
    constructor(private readonly middleService: MiddleService) {}

    @Get('get-teams/:data')
    async getTeamNames(@Body() data: { email: string }){
        return await this.middleService.getTeams(data);
    }


    /*@Post('change-team-name')
    async changeTeamName(@Body() data: { id: number, name: string }){
        return await this.middleService.changeTeamName(data);
    }*/
}
