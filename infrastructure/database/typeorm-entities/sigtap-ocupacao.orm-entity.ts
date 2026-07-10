import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_ocupacao' })
export class SigtapOcupacaoOrm {
  @PrimaryColumn({ name: 'co_ocupacao', type: 'varchar', length: 6 })
  co_ocupacao: string;

  @Column({ name: 'no_ocupacao', type: 'varchar', length: 150, nullable: true })
  no_ocupacao: string;
}
