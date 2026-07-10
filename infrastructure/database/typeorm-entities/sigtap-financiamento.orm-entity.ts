import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_financiamento' })
export class SigtapFinanciamentoOrm {
  @PrimaryColumn({ name: 'co_financiamento', type: 'varchar', length: 2 })
  co_financiamento: string;

  @Column({ name: 'no_financiamento', type: 'varchar', length: 100 })
  no_financiamento: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
