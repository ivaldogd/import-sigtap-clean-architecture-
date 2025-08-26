import { Entity, PrimaryColumn, Column, Unique } from 'typeorm';

@Entity({ name: 'sigtap_tb_procedimento' })
@Unique('uk_sigtap_proc', ['co_procedimento', 'dt_competencia'])
export class SigtapProcedimentoOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @Column({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;

  @Column({ name: 'no_procedimento', type: 'varchar', length: 255 })
  no_procedimento: string;

  @Column({ name: 'qt_maxima_execucao', type: 'int', default: 0 })
  qt_maxima_execucao: number;

  @Column({ name: 'qt_dias_permanencia', type: 'int', default: 0 })
  qt_dias_permanencia: number;

  @Column({ name: 'qt_pontos', type: 'int', default: 0 })
  qt_pontos: number;

  @Column({ name: 'vl_idade_minima', type: 'int', default: 0 })
  vl_idade_minima: number;

  @Column({ name: 'vl_idade_maxima', type: 'int', default: 0 })
  vl_idade_maxima: number;

  @Column({ name: 'vl_servico_hospitalar', type: 'numeric', precision: 12, scale: 2, default: 0 })
  vl_servico_hospitalar: number;

  @Column({ name: 'vl_servico_ambulatorial', type: 'numeric', precision: 12, scale: 2, default: 0 })
  vl_servico_ambulatorial: number;

  @Column({ name: 'vl_servico_profissional', type: 'numeric', precision: 12, scale: 2, default: 0 })
  vl_servico_profissional: number;

  @Column({ name: 'qt_tempo_permanencia', type: 'int', default: 0 })
  qt_tempo_permanencia: number;
}
