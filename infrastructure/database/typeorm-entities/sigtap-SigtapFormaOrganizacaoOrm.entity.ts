import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_forma_organizacao' })
export class SigtapFormaOrganizacaoOrm {
  @PrimaryColumn({ name: 'co_grupo', type: 'varchar', length: 4 })
  co_grupo: string;

  @PrimaryColumn({ name: 'co_sub_grupo', type: 'varchar', length: 4 })
  co_sub_grupo: string;

  @PrimaryColumn({ name: 'co_forma_organizacao', type: 'varchar', length: 2 })
  co_forma_organizacao: string;

  @Column({ name: 'no_forma_organizacao', type: 'varchar', length: 100 })
  no_forma_organizacao: string;

  @Column({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
