import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_habilitacao' })
export class SigtapProcedimentoHabilitacaoOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_habilitacao', type: 'varchar', length: 4 })
  co_habilitacao: string;

  @Column({ name: 'nu_grupo_habilitacao', type: 'varchar', length: 4, nullable: true })
  nu_grupo_habilitacao: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
