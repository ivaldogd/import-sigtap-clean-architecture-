import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_sia_sih' })
export class SigtapSiaSihOrm {
  @PrimaryColumn({ name: 'co_procedimento_sia_sih', type: 'varchar', length: 10 })
  co_procedimento_sia_sih: string;

  @Column({ name: 'no_procedimento_sia_sih', type: 'varchar', length: 100, nullable: true })
  no_procedimento_sia_sih: string;

  @Column({ name: 'tp_procedimento', type: 'char', length: 1, nullable: true })
  tp_procedimento: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
