/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create.member.dto';
import { UpdateMemberDto } from './dto/update.member.dto';
import e from 'express';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async create(@Body() createMemberDto: CreateMemberDto){
    const team = await this.memberService.create(createMemberDto);
    return team;
  }

  @Get()
  async findAll(){
    const teams = await this.memberService.findAll();
    return teams;
  }

  @Get(':email')
  async findOne(@Param('email') email: string){
    const team = await this.memberService.findOne(email);
    if(!team){
        throw new NotFoundException('User not found');
    }
    return team;
  }

  @Put(':email')
  async update(@Param('email') email: string, @Body() updateMemberDto: UpdateMemberDto){
    const team = await this.memberService.update(email, updateMemberDto);
    return team;
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    await this.memberService.remove(email);
    return 'User deleted';
  }

  @Get('teamIdsByEmail/:email')
  async findTeamsByEmail(@Param('email') email: string): Promise<number[]> {
    const teamIds = await this.memberService.findTeamsByEmail(email);
    return teamIds;
  }

  @Get('members/:id_team')
  async findMemberByIdTeam(@Param('id_team') id_team: string): Promise<{emails: string[]}>{
    const id = parseInt(id_team,10);
    return await this.memberService.findByIdTeam(id);
  }

  @Delete('member-team/:email')
  async deleteMemberTeam(@Param('email') email: string, id_team: number){
    return await this.memberService.deleteMemberTeam(id_team, email);
  }
}
