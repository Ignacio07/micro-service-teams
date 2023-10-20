/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { MemberService } from 'src/members/member.service';
import { TeamService } from 'src/teams/team.service';
import { NewTeamDto } from './dto/new.team.dto';

@Injectable()
export class MiddleService {
    constructor(
        private readonly teamService: TeamService, 
        private readonly memberService: MemberService,
    ) {}

    async newTeam({name, firstName, lastName, email, rol} : NewTeamDto){
        const team = await this.teamService.create({name});
        const id_team = team.id;
        console.log(id_team);
        const member = await this.memberService.create({firstName, lastName, email, rol, id_team});
        return {team, member};
    }

    async getTeamNames(data: { email: string }): Promise<string[]> {
        const email = data.email;
        console.log(email);
        const teamIds = await this.memberService.findTeamsByEmail(email); 
        const teams = await this.teamService.findTeamsById(teamIds);
        const teamNames = teams.map((team) => team.name);
        console.log(teamNames);
        return teamNames;  
    }


    /*async changeTeamName(data: { email: string , id}): Promise<string> {
        const email = data.email;
        const teamIds = await this.memberService.findTeamsByEmail(email);
        const teams = await this.teamService.findTeamsById(teamIds);
        const teamNames
        return team.name;
    }*/
}
