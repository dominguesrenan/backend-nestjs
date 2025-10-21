import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { SegmentosService } from './segmentos.service';
import { JwtAuthGuard } from '../../shared/guards/jwt-auth.guard';
import { CreateSegmentoDto, UpdateSegmentoDto } from './dto/segmento.dto';

@Controller('segmentos')
export class SegmentosController {
  constructor(private readonly segmentosService: SegmentosService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.segmentosService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.segmentosService.findOne(+id);
  }

  @Post()
  create(@Body() createSegmentoDto: CreateSegmentoDto) {
    return this.segmentosService.create(createSegmentoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSegmentoDto: UpdateSegmentoDto
  ) {
    return this.segmentosService.update(+id, updateSegmentoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.segmentosService.remove(+id);
  }
}
