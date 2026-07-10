import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_rede_atencao' })
export class SigtapRedeAtencaoOrm {
  @PrimaryColumn({ name: 'co_rede_atencao', type: 'varchar', length: 3 })
  co_rede_atencao: string;

  @Column({ name: 'no_rede_atencao', type: 'varchar', length: 50, nullable: true })
  no_rede_atencao: string;
}
