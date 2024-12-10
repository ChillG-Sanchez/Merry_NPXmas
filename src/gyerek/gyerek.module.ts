import { Module } from '@nestjs/common';
import { GyerekService } from './gyerek.service';
import { GyerekController } from './gyerek.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GyerekController],
  providers: [GyerekService],
})
export class GyerekModule {}
