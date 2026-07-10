import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_servico_classificacao' })
export class SigtapServicoClassificacaoOrm {
  @PrimaryColumn({ name: 'co_servico', type: 'varchar', length: 3 })
  co_servico: string;

  @PrimaryColumn({ name: 'co_classificacao', type: 'varchar', length: 3 })
  co_classificacao: string;

  @Column({ name: 'no_classificacao', type: 'varchar', length: 150, nullable: true })
  no_classificacao: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
