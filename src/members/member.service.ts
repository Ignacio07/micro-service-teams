/*
https://docs.nestjs.com/providers#services
*/

import { BadRequestException, Injectable } from '@nestjs/common';
import { Member } from './entities/member.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from './dto/create.member.dto';
import { UpdateMemberDto } from './dto/update.member.dto';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private memberRepository: Repository<Member>,
    ) {}

    async create(createMemberDto: CreateMemberDto): Promise<Member> {
        const member = this.memberRepository.create(createMemberDto);
        return await this.memberRepository.save(member);
    }

    async findAll(): Promise<Member[]> {
        return this.memberRepository.find();
    }

    async findOne(email: string): Promise<Member | undefined>{
        return this.memberRepository.findOneBy({email});
    }

    async update(email: string, updateMemberDto: UpdateMemberDto): Promise<Member | undefined> {
        const team = await this.memberRepository.findOneBy({email});
        if(!team){
            throw new BadRequestException('User not found');
        }
        Object.assign(team, updateMemberDto);
        return await this.memberRepository.save(team);
    }

    async remove(email: string): Promise<void>{
        const team = await this.memberRepository.findOneBy({email});
        if(!team){
            throw new BadRequestException('User not found');
        }

        await this.memberRepository.remove(team);
    }

    async findTeamsByEmail(email: string): Promise<number[]> {
        const members = await this.memberRepository.find({where : {email}});
        const teamIds = members.map((member) => member.id_team);
        return teamIds;
    } 
    
    async findByIdTeam(id: number): Promise<{emails: string[]}>{
        const members = await this.memberRepository.createQueryBuilder('member')
            .where('member.id_team = :id', { id })
            .getMany();

        const emails = members.map((member) => member.email);

        return { emails }; 
    }

    async deleteMembersByTeamId(id_team: number): Promise<void> {
        try {
          const membersToDelete = await this.memberRepository.find({ where : {id_team} });
          await Promise.all(membersToDelete.map(member => this.memberRepository.delete(member)));
        } catch (error) {
          throw new Error(`Error al eliminar miembros del equipo: ${error}`);
        }
    }

    async deleteMemberTeam(id_team: number, email: string): Promise<string>{
         try{ 
            const existingMember = await this.memberRepository.findOne({ where: {email, id_team}});
            console.log(id_team, existingMember);
            if (!existingMember) {
            throw new Error('El Miembro no existe');
            }
            await this.memberRepository.delete(existingMember);
            return 'Miembro eliminado';
        } catch (error) {
            throw new Error('Error al eliminar miembros del equipo');
        }
    }
} 
