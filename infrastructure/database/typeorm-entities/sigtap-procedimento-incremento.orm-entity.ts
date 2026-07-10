import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_incremento' })
export class SigtapProcedimentoIncrementoOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_habilitacao', type: 'varchar', length: 4 })
  co_habilitacao: string;

  @Column({ name: 'vl_percentual_sh', type: 'numeric', nullable: true })
  vl_percentual_sh: number;

  @Column({ name: 'vl_percentual_sa', type: 'numeric', nullable: true })
  vl_percentual_sa: number;

  @Column({ name: 'vl_percentual_sp', type: 'numeric', nullable: true })
  vl_percentual_sp: number;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
