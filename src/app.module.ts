import { Module } from '@nestjs/common';
import { GyerekModule } from './gyerek/gyerek.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [GyerekModule, PrismaModule],
})
export class AppModule {}
