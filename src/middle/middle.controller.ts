/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Param } from '@nestjs/common';
import { MiddleService } from './middle.service';
import { Post, Body } from '@nestjs/common';


@Controller('middle')
export class MiddleController { 
    constructor(private readonly middleService: MiddleService) {}

    @Post('get-teams')
    async getTeamNames(@Body() data: { email: string }){
        return await this.middleService.getTeams(data);
    }

    /*@Post('change-team-name')
    async changeTeamName(@Body() data: { id: number, name: string }){
        return await this.middleService.changeTeamName(data);
    }*/
}
