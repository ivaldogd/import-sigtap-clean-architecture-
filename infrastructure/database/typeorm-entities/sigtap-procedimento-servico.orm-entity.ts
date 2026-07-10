import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_servico' })
export class SigtapProcedimentoServicoOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_servico', type: 'varchar', length: 3 })
  co_servico: string;

  @PrimaryColumn({ name: 'co_classificacao', type: 'varchar', length: 3 })
  co_classificacao: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
