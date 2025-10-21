import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SegmentosController } from './segmentos.controller';
import { SegmentosService } from './segmentos.service';
import { Segmento } from './entities/segmento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Segmento])],
  controllers: [SegmentosController],
  providers: [SegmentosService],
  exports: [SegmentosService],
})
export class SegmentosModule {}
