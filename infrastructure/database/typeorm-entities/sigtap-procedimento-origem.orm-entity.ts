import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_origem' })
export class SigtapProcedimentoOrigemOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_procedimento_origem', type: 'varchar', length: 10 })
  co_procedimento_origem: string;

  @PrimaryColumn({ name: 'dt_competencia', type: 'varchar', length: 6 })
  dt_competencia: string;
}
