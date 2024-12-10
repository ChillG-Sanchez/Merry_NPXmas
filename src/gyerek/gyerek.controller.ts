import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, ConflictException } from '@nestjs/common';
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
  findOne(@Param('id') id: string) {
    return this.gyerekService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGyerekDto: UpdateGyerekDto) {
    if (!updateGyerekDto.joVoltE && updateGyerekDto.kertJatek) {
      throw new ConflictException('Rossz gyerek nem kérhet játékot.');
    }
    return this.gyerekService.update(+id, updateGyerekDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gyerekService.remove(+id);
  }
}
