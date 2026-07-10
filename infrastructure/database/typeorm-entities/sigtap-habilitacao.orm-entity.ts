import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_habilitacao' })
export class SigtapHabilitacaoOrm {
  @PrimaryColumn({ name: 'co_habilitacao', type: 'varchar', length: 4 })
  co_habilitacao: string;

  @Column({ name: 'no_habilitacao', type: 'varchar', length: 150 })
  no_habilitacao: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
