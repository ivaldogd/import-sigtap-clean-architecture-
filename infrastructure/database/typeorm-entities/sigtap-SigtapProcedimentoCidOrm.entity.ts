import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_cid' })
export class SigtapProcedimentoCidOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_cid', type: 'varchar', length: 4 })
  co_cid: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;

  @Column({ name: 'st_principal', type: 'char', length: 1 })
  st_principal: string;
}
