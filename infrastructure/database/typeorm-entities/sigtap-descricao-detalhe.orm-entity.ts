import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_descricao_detalhe' })
export class SigtapDescricaoDetalheOrm {
  @PrimaryColumn({ name: 'co_detalhe', type: 'varchar', length: 3 })
  co_detalhe: string;

  @Column({ name: 'ds_detalhe', type: 'text', nullable: true })
  ds_detalhe: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
