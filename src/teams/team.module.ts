import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { MemberModule } from 'src/members/member.module';

@Module({
    imports: [TypeOrmModule.forFeature([Team]),],
    controllers: [TeamController],
    providers: [TeamService],
    exports: [TeamService],
})
export class TeamModule { }
