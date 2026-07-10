import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_componente_rede' })
export class SigtapComponenteRedeOrm {
  @PrimaryColumn({ name: 'co_componente_rede', type: 'varchar', length: 10 })
  co_componente_rede: string;

  @Column({ name: 'no_componente_rede', type: 'varchar', length: 150, nullable: true })
  no_componente_rede: string;

  @Column({ name: 'co_rede_atencao', type: 'varchar', length: 3, nullable: true })
  co_rede_atencao: string;
}
