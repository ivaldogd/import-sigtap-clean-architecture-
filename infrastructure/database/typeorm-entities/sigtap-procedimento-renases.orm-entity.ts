import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_renases' })
export class SigtapProcedimentoRenasesOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_renases', type: 'varchar', length: 10 })
  co_renases: string;
}
