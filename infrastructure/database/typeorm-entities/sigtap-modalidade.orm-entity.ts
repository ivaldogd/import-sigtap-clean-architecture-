import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_modalidade' })
export class SigtapModalidadeOrm {
  @PrimaryColumn({ name: 'co_modalidade', type: 'varchar', length: 2 })
  co_modalidade: string;

  @Column({ name: 'no_modalidade', type: 'varchar', length: 100 })
  no_modalidade: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
