import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { GyerekService } from './gyerek.service';
import { CreateGyerekDto } from './dto/create-gyerek.dto';
import { UpdateGyerekDto } from './dto/update-gyerek.dto';

@Controller('gyerek')
export class GyerekController {
  constructor(private readonly gyerekService: GyerekService) {}

  @Post()
  create(@Body() createGyerekDto: CreateGyerekDto) {
    if (!createGyerekDto.joVoltE && createGyerekDto.kertJatek) {
      throw new BadRequestException('Rossz gyerek nem kérhet játékot.');
    }
    return this.gyerekService.create(createGyerekDto);
  }

  @Get()
  findAll(@Query('address') address?: string) {
    return this.gyerekService.findAll(address);
  }

  @Get('jo')
  findGoodChildren() {
    return this.gyerekService.findGoodChildren();
  }

  @Get('jatekok')
  findAllGames() {
    return this.gyerekService.findAllGames();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const gyerek = await this.gyerekService.findOne(+id);
    if (!gyerek) {
      throw new NotFoundException('Gyerek nem található.');
    }
    return gyerek;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateGyerekDto: UpdateGyerekDto) {
    if (!updateGyerekDto.joVoltE && updateGyerekDto.kertJatek) {
      throw new ConflictException('Rossz gyerek nem kérhet játékot.');
    }
    const gyerek = await this.gyerekService.update(+id, updateGyerekDto);
    if (!gyerek) {
      throw new NotFoundException('Gyerek nem található.');
    }
    return gyerek;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const gyerek = await this.gyerekService.remove(+id);
    if (!gyerek) {
      throw new NotFoundException('Gyerek nem található.');
    }
    return gyerek;
  }
}
