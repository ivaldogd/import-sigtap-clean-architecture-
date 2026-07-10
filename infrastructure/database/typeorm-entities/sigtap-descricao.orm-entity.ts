import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_descricao' })
export class SigtapDescricaoOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @Column({ name: 'ds_procedimento', type: 'text', nullable: true })
  ds_procedimento: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
