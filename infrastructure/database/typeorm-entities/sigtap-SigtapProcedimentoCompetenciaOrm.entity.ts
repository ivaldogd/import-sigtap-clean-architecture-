import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_competencia' })
export class SigtapProcedimentoCompetenciaOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
