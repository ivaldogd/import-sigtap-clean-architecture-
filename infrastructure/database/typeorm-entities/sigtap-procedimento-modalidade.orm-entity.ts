import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_modalidade' })
export class SigtapProcedimentoModalidadeOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_modalidade', type: 'varchar', length: 2 })
  co_modalidade: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
