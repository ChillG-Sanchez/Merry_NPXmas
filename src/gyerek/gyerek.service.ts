import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGyerekDto } from './dto/create-gyerek.dto';
import { UpdateGyerekDto } from './dto/update-gyerek.dto';

@Injectable()
export class GyerekService {
  constructor(private prisma: PrismaService) {}

  create(createGyerekDto: CreateGyerekDto) {
    if (!createGyerekDto.joVoltE && createGyerekDto.kertJatek) {
      throw new BadRequestException('Rossz gyerek nem kérhet játékot.');
    }
    return this.prisma.gyerek.create({ data: createGyerekDto });
  }

  findAll(address?: string) {
    const where = address ? { lakcim: { contains: address } } : {};
    return this.prisma.gyerek.findMany({ where });
  }

  findGoodChildren() {
    return this.prisma.gyerek.findMany({ where: { joVoltE: true } });
  }

  async findAllGames() {
    const games = await this.prisma.gyerek.groupBy({
      by: ['kertJatek'],
      _count: {
        kertJatek: true,
      },
      where: {
        kertJatek: {
          not: null,
        },
      },
    });

    return games.map(game => ({
      jatek: game.kertJatek,
      gyerekekSzama: game._count.kertJatek,
    }));
  }

  findOne(id: number) {
    return this.prisma.gyerek.findUnique({ where: { id } });
  }

  async update(id: number, updateGyerekDto: UpdateGyerekDto) {
    if (!updateGyerekDto.joVoltE && updateGyerekDto.kertJatek) {
      throw new ConflictException('Rossz gyerek nem kérhet játékot.');
    }
    if (!updateGyerekDto.joVoltE) {
      updateGyerekDto.kertJatek = null;
    }
    return this.prisma.gyerek.update({ where: { id }, data: updateGyerekDto });
  }

  async remove(id: number) {
    return this.prisma.gyerek.delete({ where: { id } });
  }
}
