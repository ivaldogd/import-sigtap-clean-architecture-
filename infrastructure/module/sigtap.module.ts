import { Module } from '@nestjs/common';
import { ImportSigtapUseCase } from 'app/core/use-cases/import-sigtap-zip.usecase';
import { GetSigtapAuditUseCase } from 'app/core/use-cases/get-sigtap-audit.usecase';
import { SigtapTypeOrmRepository } from '../database/repositories/sigtap-typeorm.repository';
import { ISigtapRepository } from 'app/core/domain/repositories/sigtap-repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SigtapGrupoOrmEntity } from '../database/typeorm-entities/sigtap-grupo.orm-entity';
import { SigtapCidOrm } from '../database/typeorm-entities/sigtap-cid.orm';
import { SigtapSubGrupoOrm } from '../database/typeorm-entities/sigtap-subGroup.orm.entity';
import { SigtapFormaOrganizacaoOrm } from '../database/typeorm-entities/sigtap-SigtapFormaOrganizacaoOrm.entity';
import { SigtapProcedimentoCidOrm } from '../database/typeorm-entities/sigtap-SigtapProcedimentoCidOrm.entity';
import { SigtapProcedimentoCompetenciaOrm } from '../database/typeorm-entities/sigtap-SigtapProcedimentoCompetenciaOrm.entity';
import { SigtapProcedimentoOrm } from '../database/typeorm-entities/sigtap-SigtapProcedimentoOrm.entity';
import { SigtapController } from 'app/application/sigtap/sigtap.controller';
import { SigtapProcedimentoCompativelOrm } from '../database/typeorm-entities/sigtap-SigtapProcedimentoCompativel';
import { ChangeLogOrmEntity } from '../database/typeorm-entities/change-log.orm-entity';

// Novos imports das ORM entities
import { SigtapModalidadeOrm } from '../database/typeorm-entities/sigtap-modalidade.orm-entity';
import { SigtapHabilitacaoOrm } from '../database/typeorm-entities/sigtap-habilitacao.orm-entity';
import { SigtapGrupoHabilitacaoOrm } from '../database/typeorm-entities/sigtap-grupo-habilitacao.orm-entity';
import { SigtapDetalheOrm } from '../database/typeorm-entities/sigtap-detalhe.orm-entity';
import { SigtapFinanciamentoOrm } from '../database/typeorm-entities/sigtap-financiamento.orm-entity';
import { SigtapComponenteRedeOrm } from '../database/typeorm-entities/sigtap-componente-rede.orm-entity';
import { SigtapRedeAtencaoOrm } from '../database/typeorm-entities/sigtap-rede-atencao.orm-entity';
import { SigtapRegistroOrm } from '../database/typeorm-entities/sigtap-registro.orm-entity';
import { SigtapRegraCondicionadaOrm } from '../database/typeorm-entities/sigtap-regra-condicionada.orm-entity';
import { SigtapRenasesOrm } from '../database/typeorm-entities/sigtap-renases.orm-entity';
import { SigtapRubricaOrm } from '../database/typeorm-entities/sigtap-rubrica.orm-entity';
import { SigtapServicoOrm } from '../database/typeorm-entities/sigtap-servico.orm-entity';
import { SigtapServicoClassificacaoOrm } from '../database/typeorm-entities/sigtap-servico-classificacao.orm-entity';
import { SigtapSiaSihOrm } from '../database/typeorm-entities/sigtap-sia-sih.orm-entity';
import { SigtapTussOrm } from '../database/typeorm-entities/sigtap-tuss.orm-entity';
import { SigtapOcupacaoOrm } from '../database/typeorm-entities/sigtap-ocupacao.orm-entity';
import { SigtapDescricaoOrm } from '../database/typeorm-entities/sigtap-descricao.orm-entity';
import { SigtapDescricaoDetalheOrm } from '../database/typeorm-entities/sigtap-descricao-detalhe.orm-entity';
import { SigtapProcedimentoHabilitacaoOrm } from '../database/typeorm-entities/sigtap-procedimento-habilitacao.orm-entity';
import { SigtapProcedimentoIncrementoOrm } from '../database/typeorm-entities/sigtap-procedimento-incremento.orm-entity';
import { SigtapProcedimentoLeitoOrm } from '../database/typeorm-entities/sigtap-procedimento-leito.orm-entity';
import { SigtapProcedimentoModalidadeOrm } from '../database/typeorm-entities/sigtap-procedimento-modalidade.orm-entity';
import { SigtapProcedimentoOcupacaoOrm } from '../database/typeorm-entities/sigtap-procedimento-ocupacao.orm-entity';
import { SigtapProcedimentoOrigemOrm } from '../database/typeorm-entities/sigtap-procedimento-origem.orm-entity';
import { SigtapProcedimentoRegistroOrm } from '../database/typeorm-entities/sigtap-procedimento-registro.orm-entity';
import { SigtapProcedimentoRegraCondOrm } from '../database/typeorm-entities/sigtap-procedimento-regra-cond.orm-entity';
import { SigtapProcedimentoRenasesOrm } from '../database/typeorm-entities/sigtap-procedimento-renases.orm-entity';
import { SigtapProcedimentoServicoOrm } from '../database/typeorm-entities/sigtap-procedimento-servico.orm-entity';
import { SigtapProcedimentoSiaSihOrm } from '../database/typeorm-entities/sigtap-procedimento-sia-sih.orm-entity';
import { SigtapProcedimentoTussOrm } from '../database/typeorm-entities/sigtap-procedimento-tuss.orm-entity';
import { SigtapProcedimentoComponenteRedeOrm } from '../database/typeorm-entities/sigtap-procedimento-comp-rede.orm-entity';
import { SigtapProcedimentoDetalheOrm } from '../database/typeorm-entities/sigtap-procedimento-detalhe.orm-entity';

@Module({
 imports: [
    TypeOrmModule.forFeature([
      SigtapGrupoOrmEntity,
      SigtapSubGrupoOrm,
      SigtapFormaOrganizacaoOrm,
      SigtapProcedimentoCidOrm,
      SigtapCidOrm,
      SigtapProcedimentoCompetenciaOrm,
      SigtapProcedimentoOrm,
      SigtapProcedimentoCompativelOrm,
      ChangeLogOrmEntity,
      SigtapModalidadeOrm,
      SigtapHabilitacaoOrm,
      SigtapGrupoHabilitacaoOrm,
      SigtapDetalheOrm,
      SigtapFinanciamentoOrm,
      SigtapComponenteRedeOrm,
      SigtapRedeAtencaoOrm,
      SigtapRegistroOrm,
      SigtapRegraCondicionadaOrm,
      SigtapRenasesOrm,
      SigtapRubricaOrm,
      SigtapServicoOrm,
      SigtapServicoClassificacaoOrm,
      SigtapSiaSihOrm,
      SigtapTussOrm,
      SigtapOcupacaoOrm,
      SigtapDescricaoOrm,
      SigtapDescricaoDetalheOrm,
      SigtapProcedimentoHabilitacaoOrm,
      SigtapProcedimentoIncrementoOrm,
      SigtapProcedimentoLeitoOrm,
      SigtapProcedimentoModalidadeOrm,
      SigtapProcedimentoOcupacaoOrm,
      SigtapProcedimentoOrigemOrm,
      SigtapProcedimentoRegistroOrm,
      SigtapProcedimentoRegraCondOrm,
      SigtapProcedimentoRenasesOrm,
      SigtapProcedimentoServicoOrm,
      SigtapProcedimentoSiaSihOrm,
      SigtapProcedimentoTussOrm,
      SigtapProcedimentoComponenteRedeOrm,
      SigtapProcedimentoDetalheOrm,
    ]),
  ],
  controllers: [SigtapController],
  providers: [
    ImportSigtapUseCase,
    GetSigtapAuditUseCase,
    {
      provide: ISigtapRepository,
      useClass: SigtapTypeOrmRepository,
    },
  ],
  exports: [ImportSigtapUseCase, GetSigtapAuditUseCase],
})
export class SigtapModule {}
