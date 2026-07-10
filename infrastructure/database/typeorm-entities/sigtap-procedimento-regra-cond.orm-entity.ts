import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_regra_cond' })
export class SigtapProcedimentoRegraCondOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_regra_condicionada', type: 'varchar', length: 4 })
  co_regra_condicionada: string;
}
