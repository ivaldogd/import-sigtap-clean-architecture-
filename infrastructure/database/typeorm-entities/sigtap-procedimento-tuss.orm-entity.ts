import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_tuss' })
export class SigtapProcedimentoTussOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_tuss', type: 'varchar', length: 10 })
  co_tuss: string;
}
