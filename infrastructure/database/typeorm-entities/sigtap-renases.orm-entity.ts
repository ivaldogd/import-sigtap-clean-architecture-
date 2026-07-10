import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_renases' })
export class SigtapRenasesOrm {
  @PrimaryColumn({ name: 'co_renases', type: 'varchar', length: 10 })
  co_renases: string;

  @Column({ name: 'no_renases', type: 'varchar', length: 150, nullable: true })
  no_renases: string;
}
