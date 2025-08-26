import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_sub_grupo' })
export class SigtapSubGrupoOrm {
  @PrimaryColumn({ name: 'co_grupo', type: 'varchar', length: 4 })
  co_grupo: string;

  @PrimaryColumn({ name: 'co_sub_grupo', type: 'varchar', length: 4 })
  co_sub_grupo: string;

  @Column({ name: 'no_sub_grupo', type: 'varchar', length: 100 })
  no_sub_grupo: string;

  @Column({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
