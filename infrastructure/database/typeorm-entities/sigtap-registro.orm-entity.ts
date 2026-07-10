import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_registro' })
export class SigtapRegistroOrm {
  @PrimaryColumn({ name: 'co_registro', type: 'varchar', length: 2 })
  co_registro: string;

  @Column({ name: 'no_registro', type: 'varchar', length: 50, nullable: true })
  no_registro: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
