/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Delete, Get, Param } from '@nestjs/common';
import { MiddleService } from './middle.service';
import { Post, Body } from '@nestjs/common';
import { CreateMemberTeamDto } from './dto/create.member.team.dto';


@Controller('middle')
export class MiddleController { 
    constructor(private readonly middleService: MiddleService) {}

    @Get('get-teams/:email')
    async getTeamNames(@Param('email') email: string ){
        return await this.middleService.getTeams(email);
    }

    @Post('new-member')
    async addMemberToProject(@Body() createMemberTeamDto: CreateMemberTeamDto) {
        const result = await this.middleService.addMemberToTeam(createMemberTeamDto);
        console.log(result);
        return result;   
    }

    @Delete('delete-team/:id')
    async deleteTeamAndMembers(@Param('id') id: string){
        return await this.middleService.deleteTeamAndMembers(id);
    }
}
