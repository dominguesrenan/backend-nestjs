import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Segmento } from './entities/segmento.entity';
import { CreateSegmentoDto, UpdateSegmentoDto } from './dto/segmento.dto';

@Injectable()
export class SegmentosService {
  constructor(
    @InjectRepository(Segmento)
    private readonly segmentoRepository: Repository<Segmento>
  ) {}

  async findAll(): Promise<Segmento[]> {
    return this.segmentoRepository.find({
      order: { nome: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Segmento> {
    const segmento = await this.segmentoRepository.findOne({
      where: { id },
    });

    if (!segmento) {
      throw new NotFoundException(`Segmento com ID ${id} não encontrado`);
    }

    return segmento;
  }

  async create(createSegmentoDto: CreateSegmentoDto): Promise<Segmento> {
    const segmento = this.segmentoRepository.create(createSegmentoDto);
    return this.segmentoRepository.save(segmento);
  }

  async update(
    id: number,
    updateSegmentoDto: UpdateSegmentoDto
  ): Promise<Segmento> {
    const segmento = await this.findOne(id);

    Object.assign(segmento, updateSegmentoDto);
    return this.segmentoRepository.save(segmento);
  }

  async remove(id: number): Promise<void> {
    const segmento = await this.findOne(id);
    await this.segmentoRepository.remove(segmento);
  }
}
