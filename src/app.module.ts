import { MiddleModule } from './middle/middle.module';
import { MiddleController } from './middle/middle.controller';
import { MemberModule } from './members/member.module';
import { TeamModule } from './teams/team.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { MiddleService } from './middle/middle.service';

@Module({
  imports: [TypeOrmModule.forRoot(configService.getTypeOrmConfig()), MemberModule, TeamModule],
  controllers: [AppController, MiddleController],
  providers: [AppService, MiddleService],
})
export class AppModule { }
