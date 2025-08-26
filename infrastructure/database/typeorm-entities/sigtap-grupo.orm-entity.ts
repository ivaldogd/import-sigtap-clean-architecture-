// infrastructure/database/entities/sigtap-grupo.orm-entity.ts
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('sigtap_grupo')
export class SigtapGrupoOrmEntity {

  @PrimaryColumn({ name: 'co_grupo', length: 2, type: 'varchar' })
  co_grupo: string;

  @Column({ name: 'no_grupo', length: 100 })
  no_grupo: string;

  @Column({ name: 'dt_competencia', length: 6 })
  dt_competencia: string;
}
