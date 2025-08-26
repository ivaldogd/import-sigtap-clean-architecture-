import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_cid' })
export class SigtapCidOrm {
  @PrimaryColumn({ name: 'co_cid', type: 'varchar', length: 4 })
  co_cid: string;

  @Column({ name: 'no_cid', type: 'varchar', length: 100 })
  no_cid: string;

  @Column({ name: 'tp_agravo', type: 'char', length: 1, nullable: true })
  tp_agravo: string;

  @Column({ name: 'tp_sexo', type: 'char', length: 1, nullable: true })
  tp_sexo: string;

  @Column({ name: 'tp_estadio', type: 'char', length: 1, nullable: true })
  tp_estadio: string;

  @Column({ name: 'vl_campos_irradiados', type: 'int', nullable: true })
  vl_campos_irradiados: number | null;
}
