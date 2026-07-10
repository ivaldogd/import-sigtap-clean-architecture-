import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_detalhe' })
export class SigtapDetalheOrm {
  @PrimaryColumn({ name: 'co_detalhe', type: 'varchar', length: 3 })
  co_detalhe: string;

  @Column({ name: 'no_detalhe', type: 'varchar', length: 100, nullable: true })
  no_detalhe: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
