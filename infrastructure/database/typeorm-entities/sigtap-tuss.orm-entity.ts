import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_tuss' })
export class SigtapTussOrm {
  @PrimaryColumn({ name: 'co_tuss', type: 'varchar', length: 10 })
  co_tuss: string;

  @Column({ name: 'no_tuss', type: 'varchar', length: 450, nullable: true })
  no_tuss: string;
}
