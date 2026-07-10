import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_rubrica' })
export class SigtapRubricaOrm {
  @PrimaryColumn({ name: 'co_rubrica', type: 'varchar', length: 6 })
  co_rubrica: string;

  @Column({ name: 'no_rubrica', type: 'varchar', length: 100, nullable: true })
  no_rubrica: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
