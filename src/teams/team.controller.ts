import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create.team.dto';
import { UpdateTeamDto } from './dto/update.team.dto';
import { CreateMemberDto } from 'src/members/dto/create.member.dto';

@Controller('teams')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  async create(@Body() createTeamDto: CreateTeamDto){
    const team = await this.teamService.create(createTeamDto);
    return team;
  }

  @Get()
  async findAll(){
    const teams = await this.teamService.findAll();
    return teams;
  }

  @Get(':id')
  async findOne(@Param('id') id: number){
    const team = await this.teamService.findOne(id);
    if(!team){
        throw new NotFoundException('User not found');
    }
    return team;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateTeamDto: UpdateTeamDto){
    const team = await this.teamService.update(id, updateTeamDto);
    return team;
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.teamService.remove(id);
    return 'User deleted';
  }
  
  @Get('/teamId/:id')
  async findTeamsById(@Param('id') id: number){
    const teams = await this.teamService.findTeamsById(id);
    return teams;
  }
}
