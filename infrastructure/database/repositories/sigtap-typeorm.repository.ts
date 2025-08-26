import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ISigtapRepository } from 'app/core/domain/repositories/sigtap-repository.interface';
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
}
