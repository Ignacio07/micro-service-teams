import { MemberModule } from './members/member.module';
import { MemberService } from './members/member.service';
import { MemberController } from './members/member.controller';
import { TeamModule } from './teams/team.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';

@Module({
  imports: [
    MemberModule, TypeOrmModule.forRoot(configService.getTypeOrmConfig()), TeamModule],
  controllers: [
    MemberController, AppController],
  providers: [
    MemberService, AppService],
})
export class AppModule { }
