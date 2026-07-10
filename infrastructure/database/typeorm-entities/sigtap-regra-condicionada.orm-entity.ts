import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_regra_condicionada' })
export class SigtapRegraCondicionadaOrm {
  @PrimaryColumn({ name: 'co_regra_condicionada', type: 'varchar', length: 4 })
  co_regra_condicionada: string;

  @Column({ name: 'no_regra_condicionada', type: 'varchar', length: 150, nullable: true })
  no_regra_condicionada: string;

  @Column({ name: 'ds_regra_condicionada', type: 'text', nullable: true })
  ds_regra_condicionada: string;
}
