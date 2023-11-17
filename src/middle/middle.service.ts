/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/members/member.service';
import { TeamService } from 'src/teams/team.service';


@Injectable()
export class MiddleService {
    constructor(
        private readonly teamService: TeamService, 
        private readonly memberService: MemberService,
    ) {}


    async getTeams(data: { email: string }): Promise<{ id: number; name: string }[]> {
        const email = data.email;
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


    /*async changeTeamName(data: { email: string , id}): Promise<string> {
        const email = data.email;
        const teamIds = await this.memberService.findTeamsByEmail(email);
        const teams = await this.teamService.findTeamsById(teamIds);
        const teamNames
        return team.name;
    }*/
}
