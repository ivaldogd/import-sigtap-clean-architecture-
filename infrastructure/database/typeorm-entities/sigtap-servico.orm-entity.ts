import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_servico' })
export class SigtapServicoOrm {
  @PrimaryColumn({ name: 'co_servico', type: 'varchar', length: 3 })
  co_servico: string;

  @Column({ name: 'no_servico', type: 'varchar', length: 120, nullable: true })
  no_servico: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
