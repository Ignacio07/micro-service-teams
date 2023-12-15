/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/members/member.service';
import { TeamService } from 'src/teams/team.service';
import { CreateMemberTeamDto } from './dto/create.member.team.dto';


@Injectable()
export class MiddleService {
    constructor(
        private readonly teamService: TeamService, 
        private readonly memberService: MemberService,
    ) {}


    async getTeams(email: string ): Promise<{ id: number; name: string }[]> {
        console.log(email);
        const teamIds = await this.memberService.findTeamsByEmail(email);
        const teams = await this.teamService.findTeamsById(teamIds);
        const teamsInfo = teams.map((team) => ({
            id: team.id,
            name: team.name,
        }));
    
        console.log(teamsInfo);
        return teamsInfo;
        
    }

    async addMemberToTeam({ email, id }: CreateMemberTeamDto) {
        const id_team = parseInt(id,10);
        console.log(id_team);
        const existingTeam = await this.teamService.findOne(id_team);
        if (!existingTeam) {
            throw new Error('El Equipo no existe');
        }
        const add = await this.memberService.create({email, id_team})
        return add;
    }

    /*async changeTeamName(data: { email: string , id}): Promise<string> {
        const email = data.email;
        const teamIds = await this.memberService.findTeamsByEmail(email);
        const teams = await this.teamService.findTeamsById(teamIds);
        const teamNames
        return team.name;
    }*/
}
