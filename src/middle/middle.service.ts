/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/members/member.service';
import { TeamService } from 'src/teams/team.service';
import { CreateMemberTeamDto } from './dto/create.member.team.dto';


@Injectable()
export class MiddleService {
    httpService: any;
    constructor(
        private readonly teamService: TeamService, 
        private readonly memberService: MemberService,
    ) {}


    async getTeams(data: { email: string }): Promise<{ ids: number[]; names: string[] }> {
        const email = data.email;
        console.log(email);
        const teamIds = await this.memberService.findTeamsByEmail(email);
        const teams = await this.teamService.findTeamsById(teamIds);
        const ids = teams.map((team) => team.id);
        const names = teams.map((team) => team.name);
        return { ids, names };
    }

    async addMemberToTeam({ email, id }: CreateMemberTeamDto) {
        const id_team = parseInt(id, 10);
        console.log(id_team);
        const existingTeam = await this.teamService.findOne(id_team);
        if (!existingTeam) {
          throw new Error('El Equipo no existe');
        }
        const member = await this.memberService.findOne(email);
        if (member && member.id_team === id_team) {
          throw new Error('El usuario ya pertenece a este equipo');
        }
        const add = await this.memberService.create({ email, id_team });
        return add;
      }

}
