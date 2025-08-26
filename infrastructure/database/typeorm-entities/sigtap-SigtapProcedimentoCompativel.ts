import { Entity, PrimaryColumn, Column, Index } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_compativel' })
@Index(
  'uq_procedimento_compativel',
  ['co_procedimento_principal', 'co_registro_principal', 'co_procedimento_compativel', 'co_registro_compativel', 'dt_competencia'],
  { unique: true }
)
export class SigtapProcedimentoCompativelOrm {
  @PrimaryColumn({ name: 'co_procedimento_principal', type: 'varchar', length: 10 })
  co_procedimento_principal: string;

  @PrimaryColumn({ name: 'co_registro_principal', type: 'varchar', length: 2 })
  co_registro_principal: string;

  @PrimaryColumn({ name: 'co_procedimento_compativel', type: 'varchar', length: 10 })
  co_procedimento_compativel: string;

  @PrimaryColumn({ name: 'co_registro_compativel', type: 'varchar', length: 2 })
  co_registro_compativel: string;

  @Column({ name: 'tp_compatibilidade', type: 'char', length: 1 })
  tp_compatibilidade: string;

  @Column({ name: 'qt_permitida', type: 'int', default: 0 })
  qt_permitida: number;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
