import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'sigtap_grupo_habilitacao' })
export class SigtapGrupoHabilitacaoOrm {
  @PrimaryColumn({ name: 'nu_grupo_habilitacao', type: 'varchar', length: 4 })
  nu_grupo_habilitacao: string;

  @Column({ name: 'no_grupo_habilitacao', type: 'varchar', length: 20, nullable: true })
  no_grupo_habilitacao: string;

  @Column({ name: 'ds_grupo_habilitacao', type: 'text', nullable: true })
  ds_grupo_habilitacao: string;
}
