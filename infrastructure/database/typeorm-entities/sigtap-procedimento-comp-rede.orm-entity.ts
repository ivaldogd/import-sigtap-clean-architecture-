import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'sigtap_procedimento_componente_rede' })
export class SigtapProcedimentoComponenteRedeOrm {
  @PrimaryColumn({ name: 'co_procedimento', type: 'varchar', length: 10 })
  co_procedimento: string;

  @PrimaryColumn({ name: 'co_componente_rede', type: 'varchar', length: 10 })
  co_componente_rede: string;
}
