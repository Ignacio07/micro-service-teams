/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Param } from '@nestjs/common';
import { MiddleService } from './middle.service';
import { Post, Body } from '@nestjs/common';
import { CreateMemberTeamDto } from './dto/create.member.team.dto';


@Controller('middle')
export class MiddleController { 
    constructor(private readonly middleService: MiddleService) {}

    @Get('get-teams/:email')
    async getTeamNames(@Body() data: { email: string }){
        return await this.middleService.getTeams(data);
    }

    @Post('new-member')
    async addMemberToProject(@Body() createMemberTeamDto: CreateMemberTeamDto) {
        const result = await this.middleService.addMemberToTeam(createMemberTeamDto);
        console.log(result);
        return result;   
    }
}
