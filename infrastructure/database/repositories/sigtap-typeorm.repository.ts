import { Injectable } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISigtapRepository } from 'app/core/domain/repositories/sigtap-repository.interface';
import { ChangeLog } from 'app/core/domain/entities/change-log';
import { SigtapCid } from 'app/core/domain/entities/cid';
import { SigtapFormaOrganizacao } from 'app/core/domain/entities/forma-organizacao';
import { SigtapGrupo } from 'app/core/domain/entities/grupo';
import { SigtapProcedimento } from 'app/core/domain/entities/procedimento';
import { SigtapProcedimentoCid } from 'app/core/domain/entities/procedimento-cid';
import { SigtapProcedimentoCompetencia } from 'app/core/domain/entities/procedimento-competencia';
import { SigtapSubGrupo } from 'app/core/domain/entities/sub-grupo';
import { SigtapCidOrm } from '../typeorm-entities/sigtap-cid.orm';
import { SigtapFormaOrganizacaoOrm } from '../typeorm-entities/sigtap-SigtapFormaOrganizacaoOrm.entity';
import { SigtapProcedimentoCidOrm } from '../typeorm-entities/sigtap-SigtapProcedimentoCidOrm.entity';
import { SigtapProcedimentoCompetenciaOrm } from '../typeorm-entities/sigtap-SigtapProcedimentoCompetenciaOrm.entity';
import { SigtapProcedimentoOrm } from '../typeorm-entities/sigtap-SigtapProcedimentoOrm.entity';
import { SigtapSubGrupoOrm } from '../typeorm-entities/sigtap-subGroup.orm.entity';
import { SigtapGrupoOrmEntity } from '../typeorm-entities/sigtap-grupo.orm-entity';
import { SigtapProcedimentoCompativelOrm } from '../typeorm-entities/sigtap-SigtapProcedimentoCompativel';
import { SigtapProcedimentoCompativel } from 'app/core/domain/entities/procedimento-compativel';
import { ChangeLogger } from 'app/core/domain/services/change-logger.service';
import { ChangeLogOrmEntity } from '../typeorm-entities/change-log.orm-entity';

// Novos imports das entidades de domínio
import { SigtapModalidade } from 'app/core/domain/entities/modalidade';
import { SigtapHabilitacao } from 'app/core/domain/entities/habilitacao';
import { SigtapGrupoHabilitacao } from 'app/core/domain/entities/grupo-habilitacao';
import { SigtapDetalhe } from 'app/core/domain/entities/detalhe';
import { SigtapFinanciamento } from 'app/core/domain/entities/financiamento';
import { SigtapComponenteRede } from 'app/core/domain/entities/componente-rede';
import { SigtapRedeAtencao } from 'app/core/domain/entities/rede-atencao';
import { SigtapRegistro } from 'app/core/domain/entities/registro';
import { SigtapRegraCondicionada } from 'app/core/domain/entities/regra-condicionada';
import { SigtapRenases } from 'app/core/domain/entities/renases';
import { SigtapRubrica } from 'app/core/domain/entities/rubrica';
import { SigtapServico } from 'app/core/domain/entities/servico';
import { SigtapServicoClassificacao } from 'app/core/domain/entities/servico-classificacao';
import { SigtapSiaSih } from 'app/core/domain/entities/sia-sih';
import { SigtapTuss } from 'app/core/domain/entities/tuss';
import { SigtapOcupacao } from 'app/core/domain/entities/ocupacao';
import { SigtapDescricao } from 'app/core/domain/entities/descricao';
import { SigtapDescricaoDetalhe } from 'app/core/domain/entities/descricao-detalhe';
import { SigtapProcedimentoHabilitacao } from 'app/core/domain/entities/procedimento-habilitacao';
import { SigtapProcedimentoIncremento } from 'app/core/domain/entities/procedimento-incremento';
import { SigtapProcedimentoLeito } from 'app/core/domain/entities/procedimento-leito';
import { SigtapProcedimentoModalidade } from 'app/core/domain/entities/procedimento-modalidade';
import { SigtapProcedimentoOcupacao } from 'app/core/domain/entities/procedimento-ocupacao';
import { SigtapProcedimentoOrigem } from 'app/core/domain/entities/procedimento-origem';
import { SigtapProcedimentoRegistro } from 'app/core/domain/entities/procedimento-registro';
import { SigtapProcedimentoRegraCond } from 'app/core/domain/entities/procedimento-regra-cond';
import { SigtapProcedimentoRenases } from 'app/core/domain/entities/procedimento-renases';
import { SigtapProcedimentoServico } from 'app/core/domain/entities/procedimento-servico';
import { SigtapProcedimentoSiaSih } from 'app/core/domain/entities/procedimento-sia-sih';
import { SigtapProcedimentoTuss } from 'app/core/domain/entities/procedimento-tuss';
import { SigtapProcedimentoCompRede } from 'app/core/domain/entities/procedimento-comp-rede';
import { SigtapProcedimentoDetalhe } from 'app/core/domain/entities/procedimento-detalhe';

// Novos imports das ORM Entities
import { SigtapModalidadeOrm } from '../typeorm-entities/sigtap-modalidade.orm-entity';
import { SigtapHabilitacaoOrm } from '../typeorm-entities/sigtap-habilitacao.orm-entity';
import { SigtapGrupoHabilitacaoOrm } from '../typeorm-entities/sigtap-grupo-habilitacao.orm-entity';
import { SigtapDetalheOrm } from '../typeorm-entities/sigtap-detalhe.orm-entity';
import { SigtapFinanciamentoOrm } from '../typeorm-entities/sigtap-financiamento.orm-entity';
import { SigtapComponenteRedeOrm } from '../typeorm-entities/sigtap-componente-rede.orm-entity';
import { SigtapRedeAtencaoOrm } from '../typeorm-entities/sigtap-rede-atencao.orm-entity';
import { SigtapRegistroOrm } from '../typeorm-entities/sigtap-registro.orm-entity';
import { SigtapRegraCondicionadaOrm } from '../typeorm-entities/sigtap-regra-condicionada.orm-entity';
import { SigtapRenasesOrm } from '../typeorm-entities/sigtap-renases.orm-entity';
import { SigtapRubricaOrm } from '../typeorm-entities/sigtap-rubrica.orm-entity';
import { SigtapServicoOrm } from '../typeorm-entities/sigtap-servico.orm-entity';
import { SigtapServicoClassificacaoOrm } from '../typeorm-entities/sigtap-servico-classificacao.orm-entity';
import { SigtapSiaSihOrm } from '../typeorm-entities/sigtap-sia-sih.orm-entity';
import { SigtapTussOrm } from '../typeorm-entities/sigtap-tuss.orm-entity';
import { SigtapOcupacaoOrm } from '../typeorm-entities/sigtap-ocupacao.orm-entity';
import { SigtapDescricaoOrm } from '../typeorm-entities/sigtap-descricao.orm-entity';
import { SigtapDescricaoDetalheOrm } from '../typeorm-entities/sigtap-descricao-detalhe.orm-entity';
import { SigtapProcedimentoHabilitacaoOrm } from '../typeorm-entities/sigtap-procedimento-habilitacao.orm-entity';
import { SigtapProcedimentoIncrementoOrm } from '../typeorm-entities/sigtap-procedimento-incremento.orm-entity';
import { SigtapProcedimentoLeitoOrm } from '../typeorm-entities/sigtap-procedimento-leito.orm-entity';
import { SigtapProcedimentoModalidadeOrm } from '../typeorm-entities/sigtap-procedimento-modalidade.orm-entity';
import { SigtapProcedimentoOcupacaoOrm } from '../typeorm-entities/sigtap-procedimento-ocupacao.orm-entity';
import { SigtapProcedimentoOrigemOrm } from '../typeorm-entities/sigtap-procedimento-origem.orm-entity';
import { SigtapProcedimentoRegistroOrm } from '../typeorm-entities/sigtap-procedimento-registro.orm-entity';
import { SigtapProcedimentoRegraCondOrm } from '../typeorm-entities/sigtap-procedimento-regra-cond.orm-entity';
import { SigtapProcedimentoRenasesOrm } from '../typeorm-entities/sigtap-procedimento-renases.orm-entity';
import { SigtapProcedimentoServicoOrm } from '../typeorm-entities/sigtap-procedimento-servico.orm-entity';
import { SigtapProcedimentoSiaSihOrm } from '../typeorm-entities/sigtap-procedimento-sia-sih.orm-entity';
import { SigtapProcedimentoTussOrm } from '../typeorm-entities/sigtap-procedimento-tuss.orm-entity';
import { SigtapProcedimentoComponenteRedeOrm } from '../typeorm-entities/sigtap-procedimento-comp-rede.orm-entity';
import { SigtapProcedimentoDetalheOrm } from '../typeorm-entities/sigtap-procedimento-detalhe.orm-entity';

@Injectable()
export class SigtapTypeOrmRepository implements ISigtapRepository {
  private readonly BATCH_SIZE = 1000;

  constructor(
    @InjectRepository(SigtapGrupoOrmEntity)
    private readonly grupoRepo: Repository<SigtapGrupoOrmEntity>,
    @InjectRepository(SigtapSubGrupoOrm)
    private readonly subGrupoRepo: Repository<SigtapSubGrupoOrm>,
    @InjectRepository(SigtapFormaOrganizacaoOrm)
    private readonly formaRepo: Repository<SigtapFormaOrganizacaoOrm>,
    @InjectRepository(SigtapProcedimentoOrm)
    private readonly procedimentoRepo: Repository<SigtapProcedimentoOrm>,
    @InjectRepository(SigtapProcedimentoCidOrm)
    private readonly procedimentoCidRepo: Repository<SigtapProcedimentoCidOrm>,
    @InjectRepository(SigtapProcedimentoCompetenciaOrm)
    private readonly procedimentoCompetenciaRepo: Repository<SigtapProcedimentoCompetenciaOrm>,
    @InjectRepository(SigtapCidOrm)
    private readonly cidRepo: Repository<SigtapCidOrm>,
    @InjectRepository(SigtapProcedimentoCompativelOrm)
    private readonly procedimentoCompativelRepo: Repository<SigtapProcedimentoCompativelOrm>,
    @InjectRepository(ChangeLogOrmEntity)
    private readonly changeLogRepo: Repository<ChangeLogOrmEntity>,

    @InjectRepository(SigtapModalidadeOrm)
    private readonly modalidadeRepo: Repository<SigtapModalidadeOrm>,
    @InjectRepository(SigtapHabilitacaoOrm)
    private readonly habilitacaoRepo: Repository<SigtapHabilitacaoOrm>,
    @InjectRepository(SigtapGrupoHabilitacaoOrm)
    private readonly grupoHabilitacaoRepo: Repository<SigtapGrupoHabilitacaoOrm>,
    @InjectRepository(SigtapDetalheOrm)
    private readonly detalheRepo: Repository<SigtapDetalheOrm>,
    @InjectRepository(SigtapFinanciamentoOrm)
    private readonly financiamentoRepo: Repository<SigtapFinanciamentoOrm>,
    @InjectRepository(SigtapComponenteRedeOrm)
    private readonly componenteRedeRepo: Repository<SigtapComponenteRedeOrm>,
    @InjectRepository(SigtapRedeAtencaoOrm)
    private readonly redeAtencaoRepo: Repository<SigtapRedeAtencaoOrm>,
    @InjectRepository(SigtapRegistroOrm)
    private readonly registroRepo: Repository<SigtapRegistroOrm>,
    @InjectRepository(SigtapRegraCondicionadaOrm)
    private readonly regraCondicionadaRepo: Repository<SigtapRegraCondicionadaOrm>,
    @InjectRepository(SigtapRenasesOrm)
    private readonly renasesRepo: Repository<SigtapRenasesOrm>,
    @InjectRepository(SigtapRubricaOrm)
    private readonly rubricaRepo: Repository<SigtapRubricaOrm>,
    @InjectRepository(SigtapServicoOrm)
    private readonly servicoRepo: Repository<SigtapServicoOrm>,
    @InjectRepository(SigtapServicoClassificacaoOrm)
    private readonly servicoClassificacaoRepo: Repository<SigtapServicoClassificacaoOrm>,
    @InjectRepository(SigtapSiaSihOrm)
    private readonly siaSihRepo: Repository<SigtapSiaSihOrm>,
    @InjectRepository(SigtapTussOrm)
    private readonly tussRepo: Repository<SigtapTussOrm>,
    @InjectRepository(SigtapOcupacaoOrm)
    private readonly ocupacaoRepo: Repository<SigtapOcupacaoOrm>,
    @InjectRepository(SigtapDescricaoOrm)
    private readonly descricaoRepo: Repository<SigtapDescricaoOrm>,
    @InjectRepository(SigtapDescricaoDetalheOrm)
    private readonly descricaoDetalheRepo: Repository<SigtapDescricaoDetalheOrm>,
    @InjectRepository(SigtapProcedimentoHabilitacaoOrm)
    private readonly procedimentoHabilitacaoRepo: Repository<SigtapProcedimentoHabilitacaoOrm>,
    @InjectRepository(SigtapProcedimentoIncrementoOrm)
    private readonly procedimentoIncrementoRepo: Repository<SigtapProcedimentoIncrementoOrm>,
    @InjectRepository(SigtapProcedimentoLeitoOrm)
    private readonly procedimentoLeitoRepo: Repository<SigtapProcedimentoLeitoOrm>,
    @InjectRepository(SigtapProcedimentoModalidadeOrm)
    private readonly procedimentoModalidadeRepo: Repository<SigtapProcedimentoModalidadeOrm>,
    @InjectRepository(SigtapProcedimentoOcupacaoOrm)
    private readonly procedimentoOcupacaoRepo: Repository<SigtapProcedimentoOcupacaoOrm>,
    @InjectRepository(SigtapProcedimentoOrigemOrm)
    private readonly procedimentoOrigemRepo: Repository<SigtapProcedimentoOrigemOrm>,
    @InjectRepository(SigtapProcedimentoRegistroOrm)
    private readonly procedimentoRegistroRepo: Repository<SigtapProcedimentoRegistroOrm>,
    @InjectRepository(SigtapProcedimentoRegraCondOrm)
    private readonly procedimentoRegraCondRepo: Repository<SigtapProcedimentoRegraCondOrm>,
    @InjectRepository(SigtapProcedimentoRenasesOrm)
    private readonly procedimentoRenasesRepo: Repository<SigtapProcedimentoRenasesOrm>,
    @InjectRepository(SigtapProcedimentoServicoOrm)
    private readonly procedimentoServicoRepo: Repository<SigtapProcedimentoServicoOrm>,
    @InjectRepository(SigtapProcedimentoSiaSihOrm)
    private readonly procedimentoSiaSihRepo: Repository<SigtapProcedimentoSiaSihOrm>,
    @InjectRepository(SigtapProcedimentoTussOrm)
    private readonly procedimentoTussRepo: Repository<SigtapProcedimentoTussOrm>,
    @InjectRepository(SigtapProcedimentoComponenteRedeOrm)
    private readonly procedimentoCompRedeRepo: Repository<SigtapProcedimentoComponenteRedeOrm>,
    @InjectRepository(SigtapProcedimentoDetalheOrm)
    private readonly procedimentoDetalheRepo: Repository<SigtapProcedimentoDetalheOrm>,
  ) {}

  private async insertInBatches<T>(
    repo: Repository<T>,
    rows: any[],
    conflictCols: string[],
    updateCols: string[],
  ) {
    // Remove duplicatas baseado nas colunas de conflito
    const uniqueRowsMap = new Map<string, any>();
    for (const r of rows) {
      const key = conflictCols.map((c) => r[c]).join('|');
      uniqueRowsMap.set(key, r);
    }
    const uniqueRows = Array.from(uniqueRowsMap.values());

    for (let i = 0; i < uniqueRows.length; i += this.BATCH_SIZE) {
      const chunk = uniqueRows.slice(i, i + this.BATCH_SIZE);

      // Confirma se todas as colunas de conflito existem
      const missingCols = conflictCols.filter((c) => !(c in chunk[0]));
      if (missingCols.length > 0) {
        throw new Error(
          `Colunas de conflito não encontradas nas linhas: ${missingCols.join(', ')}`,
        );
      }

      await repo
        .createQueryBuilder()
        .insert()
        .values(chunk)
        .orUpdate(updateCols, conflictCols, {
          skipUpdateIfNoValuesChanged: true,
        })
        .execute();
    }
  }

  async saveGrupos(grupos: SigtapGrupo[]): Promise<void> {
    if (!grupos.length) return;
    const rows = grupos.map((g) => g.paraDTO());
    await this.insertInBatches(
      this.grupoRepo,
      rows,
      ['co_grupo'],
      ['no_grupo', 'dt_competencia'],
    );
  }

  async saveSubGrupos(subGrupos: SigtapSubGrupo[]): Promise<void> {
    if (!subGrupos.length) return;
    const rows = subGrupos.map((sg) => sg.paraDTO());
    await this.insertInBatches(
      this.subGrupoRepo,
      rows,
      ['co_grupo', 'co_sub_grupo'],
      ['no_sub_grupo', 'dt_competencia'],
    );
  }

  async saveFormas(formas: SigtapFormaOrganizacao[]): Promise<void> {
    if (!formas.length) return;
    const rows = formas.map((f) => ({
      co_grupo: f.coGrupo,
      co_sub_grupo: f.coSubGrupo,
      co_forma_organizacao: f.coFormaOrganizacao,
      no_forma_organizacao: f.noFormaOrganizacao,
      dt_competencia: f.dtCompetencia,
    }));
    await this.insertInBatches(
      this.formaRepo,
      rows,
      ['co_grupo', 'co_sub_grupo', 'co_forma_organizacao'],
      ['no_forma_organizacao', 'dt_competencia'],
    );
  }

  async saveProcedimentos(procs: SigtapProcedimento[]): Promise<void> {
    if (!procs.length) return;

    for (const p of procs) {
      const existing = await this.procedimentoRepo.findOne({
        where: {
          co_procedimento: p.co_procedimento,
          dt_competencia: p.dt_competencia,
        },
      });

      if (existing) {
        const diffs = ChangeLogger.diffObject(existing, p.paraDTO());
        const logs: ChangeLogOrmEntity[] = [];

        for (const [coluna, { before, after }] of Object.entries(diffs)) {
          if (before !== null && after !== null && String(before) === String(after)) {
            continue;
          }
          logs.push(
            new ChangeLogOrmEntity({
              entity: 'SigtapProcedimento',
              record_id: `${p.co_procedimento}-${p.dt_competencia}`,
              field: coluna,
              old_value: before !== null && before !== undefined ? String(before) : null,
              new_value: after !== null && after !== undefined ? String(after) : null,
              updated_by: 'system',
            }),
          );
        }

        if (logs.length) {
          await this.changeLogRepo.save(logs);
        }
      }
    }

    const rows = procs.map((p) => p.paraDTO());
    await this.insertInBatches(
      this.procedimentoRepo,
      rows,
      ['co_procedimento', 'dt_competencia'],
      [
        'no_procedimento',
        'qt_maxima_execucao',
        'qt_dias_permanencia',
        'qt_pontos',
        'vl_idade_minima',
        'vl_idade_maxima',
        'vl_servico_hospitalar',
        'vl_servico_ambulatorial',
        'vl_servico_profissional',
        'qt_tempo_permanencia',
      ],
    );
  }

  async saveProcedimentoCids(procsCid: SigtapProcedimentoCid[]): Promise<void> {
    if (!procsCid.length) return;
    const rows = procsCid.map((pc) => pc.paraDTO());
    await this.insertInBatches(
      this.procedimentoCidRepo,
      rows,
      ['co_procedimento', 'co_cid', 'dt_competencia'],
      ['st_principal'],
    );
  }

  async saveProcedimentoCompetencias(
    procsComp: SigtapProcedimentoCompetencia[],
  ): Promise<void> {
    if (!procsComp.length) return;
    const rows = procsComp.map((pc) => ({
      co_procedimento: pc.coProcedimento,
      dt_competencia: pc.dtCompetencia,
    }));
    await this.insertInBatches(
      this.procedimentoCompetenciaRepo,
      rows,
      ['co_procedimento', 'dt_competencia'],
      ['dt_competencia'],
    );
  }

  async saveCids(cids: SigtapCid[]): Promise<void> {
    if (!cids.length) return;
    const rows = cids.map((c) => c.paraDTO());
    await this.insertInBatches(
      this.cidRepo,
      rows,
      ['co_cid'],
      ['no_cid', 'tp_agravo', 'tp_sexo', 'tp_estadio', 'vl_campos_irradiados'],
    );
  }

  async saveProcedimentoCompativeis(
  procsCompat: SigtapProcedimentoCompativel[],
): Promise<void> {
  if (!procsCompat.length) return;

  for (const pc of procsCompat) {
    const existing = await this.procedimentoCompativelRepo.findOne({
      where: {
        co_procedimento_principal: pc.co_procedimento_principal,
        co_procedimento_compativel: pc.co_procedimento_compativel,
        co_registro_principal: pc.co_registro_principal,
        co_registro_compativel: pc.co_registro_compativel,
        dt_competencia: pc.dt_competencia,
      },
    });

    if (existing) {
      // diff retorna um objeto com as chaves alteradas
      const diffs = ChangeLogger.diffObject(existing, pc.paraDTO());

      const logs: ChangeLogOrmEntity[] = [];

      for (const [coluna, { before, after }] of Object.entries(diffs)) {
        logs.push(
          new ChangeLogOrmEntity({
            entity: 'SigtapProcedimentoCompativel',
            record_id: `${pc.co_procedimento_principal}-${pc.co_procedimento_compativel}-${pc.co_registro_principal}-${pc.co_registro_compativel}-${pc.dt_competencia}`,
            field: coluna,
            old_value: String(before),
            new_value: String(after),
            updated_by: 'system', // ou usuário logado
          }),
        );
      }

      if (logs.length) {
        await this.changeLogRepo.save(logs); // salva todas as alterações como linhas separadas
      }
    }
  }

  const rows = procsCompat.map((pc) => pc.paraDTO());

  await this.insertInBatches(
    this.procedimentoCompativelRepo,
    rows,
    [
      'co_procedimento_principal',
      'co_registro_principal',
      'co_procedimento_compativel',
      'co_registro_compativel',
      'dt_competencia',
    ],
    ['tp_compatibilidade', 'qt_permitida'], // colunas que podem atualizar em conflito
  );
}

  async saveModalidades(rows: SigtapModalidade[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.modalidadeRepo, rows.map(r => r.paraDTO()), ['co_modalidade', 'dt_competencia'], ['no_modalidade']);
  }

  async saveHabilitacoes(rows: SigtapHabilitacao[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.habilitacaoRepo, rows.map(r => r.paraDTO()), ['co_habilitacao', 'dt_competencia'], ['no_habilitacao']);
  }

  async saveGrupoHabilitacoes(rows: SigtapGrupoHabilitacao[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.grupoHabilitacaoRepo, rows.map(r => r.paraDTO()), ['nu_grupo_habilitacao'], ['no_grupo_habilitacao', 'ds_grupo_habilitacao']);
  }

  async saveDetalhes(rows: SigtapDetalhe[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.detalheRepo, rows.map(r => r.paraDTO()), ['co_detalhe', 'dt_competencia'], ['no_detalhe']);
  }

  async saveFinanciamentos(rows: SigtapFinanciamento[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.financiamentoRepo, rows.map(r => r.paraDTO()), ['co_financiamento', 'dt_competencia'], ['no_financiamento']);
  }

  async saveComponenteRedes(rows: SigtapComponenteRede[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.componenteRedeRepo, rows.map(r => r.paraDTO()), ['co_componente_rede'], ['no_componente_rede', 'co_rede_atencao']);
  }

  async saveRedeAtencoes(rows: SigtapRedeAtencao[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.redeAtencaoRepo, rows.map(r => r.paraDTO()), ['co_rede_atencao'], ['no_rede_atencao']);
  }

  async saveRegistros(rows: SigtapRegistro[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.registroRepo, rows.map(r => r.paraDTO()), ['co_registro', 'dt_competencia'], ['no_registro']);
  }

  async saveRegraCondicionadas(rows: SigtapRegraCondicionada[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.regraCondicionadaRepo, rows.map(r => r.paraDTO()), ['co_regra_condicionada'], ['no_regra_condicionada', 'ds_regra_condicionada']);
  }

  async saveRenases(rows: SigtapRenases[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.renasesRepo, rows.map(r => r.paraDTO()), ['co_renases'], ['no_renases']);
  }

  async saveRubricas(rows: SigtapRubrica[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.rubricaRepo, rows.map(r => r.paraDTO()), ['co_rubrica', 'dt_competencia'], ['no_rubrica']);
  }

  async saveServicos(rows: SigtapServico[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.servicoRepo, rows.map(r => r.paraDTO()), ['co_servico', 'dt_competencia'], ['no_servico']);
  }

  async saveServicoClassificacoes(rows: SigtapServicoClassificacao[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.servicoClassificacaoRepo, rows.map(r => r.paraDTO()), ['co_servico', 'co_classificacao', 'dt_competencia'], ['no_classificacao']);
  }

  async saveSiaSihs(rows: SigtapSiaSih[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.siaSihRepo, rows.map(r => r.paraDTO()), ['co_procedimento_sia_sih', 'dt_competencia'], ['no_procedimento_sia_sih', 'tp_procedimento']);
  }

  async saveTusses(rows: SigtapTuss[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.tussRepo, rows.map(r => r.paraDTO()), ['co_tuss'], ['no_tuss']);
  }

  async saveOcupacoes(rows: SigtapOcupacao[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.ocupacaoRepo, rows.map(r => r.paraDTO()), ['co_ocupacao'], ['no_ocupacao']);
  }

  async saveDescricoes(rows: SigtapDescricao[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.descricaoRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'dt_competencia'], ['ds_procedimento']);
  }

  async saveDescricaoDetalhes(rows: SigtapDescricaoDetalhe[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.descricaoDetalheRepo, rows.map(r => r.paraDTO()), ['co_detalhe', 'dt_competencia'], ['ds_detalhe']);
  }

  async saveProcedimentoHabilitacoes(rows: SigtapProcedimentoHabilitacao[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoHabilitacaoRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_habilitacao', 'dt_competencia'], ['nu_grupo_habilitacao']);
  }

  async saveProcedimentoIncrementos(rows: SigtapProcedimentoIncremento[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoIncrementoRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_habilitacao', 'dt_competencia'], ['vl_percentual_sh', 'vl_percentual_sa', 'vl_percentual_sp']);
  }

  async saveProcedimentoLeitos(rows: SigtapProcedimentoLeito[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoLeitoRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_tipo_leito', 'dt_competencia'], ['dt_competencia']);
  }

  async saveProcedimentoModalidades(rows: SigtapProcedimentoModalidade[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoModalidadeRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_modalidade', 'dt_competencia'], ['dt_competencia']);
  }

  async saveProcedimentoOcupacoes(rows: SigtapProcedimentoOcupacao[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoOcupacaoRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_ocupacao', 'dt_competencia'], ['dt_competencia']);
  }

  async saveProcedimentoOrigens(rows: SigtapProcedimentoOrigem[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoOrigemRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_procedimento_origem', 'dt_competencia'], ['dt_competencia']);
  }

  async saveProcedimentoRegistros(rows: SigtapProcedimentoRegistro[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoRegistroRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_registro', 'dt_competencia'], ['dt_competencia']);
  }

  async saveProcedimentoRegraConds(rows: SigtapProcedimentoRegraCond[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoRegraCondRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_regra_condicionada'], ['co_regra_condicionada']);
  }

  async saveProcedimentoRenases(rows: SigtapProcedimentoRenases[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoRenasesRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_renases'], ['co_renases']);
  }

  async saveProcedimentoServicos(rows: SigtapProcedimentoServico[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoServicoRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_servico', 'co_classificacao', 'dt_competencia'], ['dt_competencia']);
  }

  async saveProcedimentoSiaSihs(rows: SigtapProcedimentoSiaSih[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoSiaSihRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_procedimento_sia_sih', 'dt_competencia'], ['tp_procedimento']);
  }

  async saveProcedimentoTusses(rows: SigtapProcedimentoTuss[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoTussRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_tuss'], ['co_tuss']);
  }

  async saveProcedimentoCompRedes(rows: SigtapProcedimentoCompRede[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoCompRedeRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_componente_rede'], ['co_componente_rede']);
  }

  async saveProcedimentoDetalhes(rows: SigtapProcedimentoDetalhe[]): Promise<void> {
    if (!rows.length) return;
    await this.insertInBatches(this.procedimentoDetalheRepo, rows.map(r => r.paraDTO()), ['co_procedimento', 'co_detalhe', 'dt_competencia'], ['dt_competencia']);
  }

  async getRecentLogs(competencia: string): Promise<ChangeLog[]> {
    const ormLogs = await this.changeLogRepo.find({
      where: {
        record_id: Like(`%-${competencia}%`),
      },
      order: {
        updated_at: 'DESC',
      },
    });

    return ormLogs.map(
      (log) =>
        new ChangeLog(
          log.id,
          log.entity,
          log.record_id,
          log.field,
          log.old_value,
          log.new_value,
          log.updated_at,
          log.updated_by,
        ),
    );
  }
}
