import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create.team.dto';
import { UpdateTeamDto } from './dto/update.team.dto';
import { CreateMemberDto } from 'src/members/dto/create.member.dto';


@Injectable()
export class TeamService {
    constructor(
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
    ) {}

    async create(createTeamDto: CreateTeamDto){
        const team = this.teamRepository.create(createTeamDto);
        return await this.teamRepository.save(team);
    }

    async findAll(): Promise<Team[]> {
        return this.teamRepository.find();
    }

    async findOne(id: number): Promise<Team | undefined>{
        return this.teamRepository.findOneBy({id});
    }

    async update(id: number, updateTeamDto: UpdateTeamDto): Promise<Team | undefined> {
        const team = await this.teamRepository.findOneBy({id});
        if(!team){
            throw new BadRequestException('Team not found');
        }
        Object.assign(team, updateTeamDto);
        return await this.teamRepository.save(team);
    }

    async remove(id: number): Promise<void>{
        const team = await this.teamRepository.findOneBy({id});
        if(!team){
            throw new BadRequestException('Team not found');
        }

        await this.teamRepository.remove(team);
    }

    async findTeamsById(teamIds: number[]): Promise<Team[]> {
        const teams = await this.teamRepository.createQueryBuilder('team')
            .whereInIds(teamIds)
            .getMany();
        console.log(teams);
        return teams;
    }

    async findTeamsByIdProject(id_busqueda: number): Promise<{ ids: number[]; names: string[] }> {
        try{
            const teams = await this.teamRepository.createQueryBuilder('team')
                .where('team.id_project = :id_busqueda', { id_busqueda })
                .getMany();

            const ids = teams.map((team) => team.id);
            const names = teams.map((team) => team.name);

            return { ids, names };
        } catch (error) {
            throw new Error('Error al encontrar equipos');
        }
    }
    
} 
