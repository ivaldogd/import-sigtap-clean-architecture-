import { Injectable, BadRequestException, Inject } from '@nestjs/common';

import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import AdmZip = require('adm-zip');
import * as readline from 'readline';
import { SIGTAP_LAYOUTS } from '../layouts/sigtap-layouts';
import { SigtapGrupo } from '../domain/entities/grupo';
import { SigtapSubGrupo } from '../domain/entities/sub-grupo';
import { SigtapCid } from '../domain/entities/cid';
import { SigtapFormaOrganizacao } from '../domain/entities/forma-organizacao';
import { SigtapProcedimento } from '../domain/entities/procedimento';
import { SigtapProcedimentoCid } from '../domain/entities/procedimento-cid';
import { SigtapProcedimentoCompetencia } from '../domain/entities/procedimento-competencia';
import { ISigtapRepository } from '../domain/repositories/sigtap-repository.interface';
import { SigtapProcedimentoCompativel } from '../domain/entities/procedimento-compativel';
import { DataCleaner } from '../utils/cleaner.util';
import { KeyNormalizer } from '../utils/key-normalizer';

// Novos imports
import { SigtapModalidade } from '../domain/entities/modalidade';
import { SigtapHabilitacao } from '../domain/entities/habilitacao';
import { SigtapGrupoHabilitacao } from '../domain/entities/grupo-habilitacao';
import { SigtapDetalhe } from '../domain/entities/detalhe';
import { SigtapFinanciamento } from '../domain/entities/financiamento';
import { SigtapComponenteRede } from '../domain/entities/componente-rede';
import { SigtapRedeAtencao } from '../domain/entities/rede-atencao';
import { SigtapRegistro } from '../domain/entities/registro';
import { SigtapRegraCondicionada } from '../domain/entities/regra-condicionada';
import { SigtapRenases } from '../domain/entities/renases';
import { SigtapRubrica } from '../domain/entities/rubrica';
import { SigtapServico } from '../domain/entities/servico';
import { SigtapServicoClassificacao } from '../domain/entities/servico-classificacao';
import { SigtapSiaSih } from '../domain/entities/sia-sih';
import { SigtapTuss } from '../domain/entities/tuss';
import { SigtapOcupacao } from '../domain/entities/ocupacao';
import { SigtapDescricao } from '../domain/entities/descricao';
import { SigtapDescricaoDetalhe } from '../domain/entities/descricao-detalhe';
import { SigtapProcedimentoHabilitacao } from '../domain/entities/procedimento-habilitacao';
import { SigtapProcedimentoIncremento } from '../domain/entities/procedimento-incremento';
import { SigtapProcedimentoLeito } from '../domain/entities/procedimento-leito';
import { SigtapProcedimentoModalidade } from '../domain/entities/procedimento-modalidade';
import { SigtapProcedimentoOcupacao } from '../domain/entities/procedimento-ocupacao';
import { SigtapProcedimentoOrigem } from '../domain/entities/procedimento-origem';
import { SigtapProcedimentoRegistro } from '../domain/entities/procedimento-registro';
import { SigtapProcedimentoRegraCond } from '../domain/entities/procedimento-regra-cond';
import { SigtapProcedimentoRenases } from '../domain/entities/procedimento-renases';
import { SigtapProcedimentoServico } from '../domain/entities/procedimento-servico';
import { SigtapProcedimentoSiaSih } from '../domain/entities/procedimento-sia-sih';
import { SigtapProcedimentoTuss } from '../domain/entities/procedimento-tuss';
import { SigtapProcedimentoCompRede } from '../domain/entities/procedimento-comp-rede';
import { SigtapProcedimentoDetalhe } from '../domain/entities/procedimento-detalhe';

type AnyRow = Record<string, string>;

@Injectable()
export class ImportSigtapUseCase {
  constructor(
    @Inject(ISigtapRepository)
    private readonly repo: ISigtapRepository,
  ) {}

  async execute(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Arquivo não enviado');
    if (!file.originalname.toLowerCase().endsWith('.zip')) {
      throw new BadRequestException('Envie o pacote da competência (.zip)');
    }

    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'sigtap-'));
    const zip = new AdmZip(file.buffer);
    zip.extractAllTo(tempDir, true);

    const files = fs
      .readdirSync(tempDir)
      .reduce<Record<string, string>>((acc, f) => {
        acc[f.toLowerCase()] = path.join(tempDir, f);
        return acc;
      }, {});

    // Extrai a competência do arquivo 'versao'
    let competencia = '';
    const versaoPath = files['versao'];
    if (versaoPath && fs.existsSync(versaoPath)) {
      competencia = fs.readFileSync(versaoPath, 'utf8').trim();
    }
    if (!competencia) {
      const match = file.originalname.match(/\d{6}/);
      competencia = match ? match[0] : new Date().toISOString().slice(0, 7).replace('-', '');
    }

    await this.importGrupos(files);
    await this.importSubGrupos(files);
    await this.importFormaOrganizacao(files);
    await this.importProcedimentos(files);
    await this.importProcedimentoCid(files);
    await this.importCid(files);
    await this.importProcedimentoCompetencia(files);
    await this.importProcedimentoCompativel(files);
    await this.importModalidades(files);
    await this.importHabilitacoes(files);
    await this.importGrupoHabilitacoes(files);
    await this.importDetalhes(files);
    await this.importFinanciamentos(files);
    await this.importComponenteRedes(files);
    await this.importRedeAtencoes(files);
    await this.importRegistros(files);
    await this.importRegraCondicionadas(files);
    await this.importRenases(files);
    await this.importRubricas(files);
    await this.importServicos(files);
    await this.importServicoClassificacoes(files);
    await this.importSiaSihs(files);
    await this.importTusses(files);
    await this.importOcupacoes(files);
    await this.importDescricoes(files);
    await this.importDescricaoDetalhes(files);
    await this.importProcedimentoHabilitacoes(files);
    await this.importProcedimentoIncrementos(files);
    await this.importProcedimentoLeitos(files);
    await this.importProcedimentoModalidades(files);
    await this.importProcedimentoOcupacoes(files);
    await this.importProcedimentoOrigens(files);
    await this.importProcedimentoRegistros(files);
    await this.importProcedimentoRegraConds(files);
    await this.importProcedimentoRenases(files);
    await this.importProcedimentoServicos(files);
    await this.importProcedimentoSiaSihs(files);
    await this.importProcedimentoTusses(files);
    await this.importProcedimentoCompRedes(files);
    await this.importProcedimentoDetalhes(files);

    // Recupera os logs de alterações gerados durante a importação desta competência
    const recentLogs = await this.repo.getRecentLogs(competencia);

    // Monta o sumário das entidades modificadas
    const summary: Record<string, { inserted: number; updated: number; deleted: number }> = {};
    for (const log of recentLogs) {
      if (!summary[log.entity]) {
        summary[log.entity] = { inserted: 0, updated: 0, deleted: 0 };
      }
      summary[log.entity].updated += 1;
    }

    fs.rmSync(tempDir, { recursive: true, force: true });

    return {
      message: 'Importação SIGTAP concluída.',
      report: {
        competencia,
        summary,
        details: recentLogs.map(log => ({
          entity: log.entity,
          record_id: log.entityId,
          field: log.field,
          old_value: log.oldValue,
          new_value: log.newValue,
          changed_at: log.changedAt,
        }))
      }
    };
  }

  private async parseFile(filepath: string, fields: any[]): Promise<AnyRow[]> {
    if (!fs.existsSync(filepath)) return [];
    const rl = readline.createInterface({
      input: fs.createReadStream(filepath, { encoding: 'latin1' }),
      crlfDelay: Infinity,
    });

    const rows: AnyRow[] = [];
    for await (const line of rl) {
      if (!line.trim()) continue;
      const row: AnyRow = {};
      for (const f of fields) {
        const startIdx = f.start - 1;
        const endIdx = f.end;
        const raw = line.length >= endIdx ? line.slice(startIdx, endIdx) : '';
        row[f.name] = f.trim ? raw.trim() : raw;
      }
      rows.push(row);
    }
    return rows;
  }

  private async importGrupos(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_GRUPO'];

    const rows = await this.parseFile(
      files[layout.file.toLowerCase()],
      layout.fields,
    );

    const cleanedRows = DataCleaner.cleanAll(rows, ['co_grupo', 'no_grupo']);

    const grupos: SigtapGrupo[] = [];
    for (const r of cleanedRows) {
      try {
        const grupo = new SigtapGrupo(r.co_grupo, r.no_grupo, r.dt_competencia);
        grupos.push(grupo);
      } catch (err) {
        console.warn(
          `❌ Grupo inválido descartado: ${JSON.stringify(r)}. Motivo: ${(err as Error).message}`,
        );
      }
    }

    if (grupos.length) {
      await this.repo.saveGrupos(grupos);
    } else {
      console.warn('⚠️ Nenhum grupo válido encontrado para salvar.');
    }
  }

  private async importSubGrupos(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_SUB_GRUPO'];
    const rows = await this.parseFile(
      files[layout.file.toLowerCase()],
      layout.fields,
    );
    const cleanerRows = DataCleaner.cleanAll(rows, [
      'co_grupo',
      'co_sub_grupo',
      'no_sub_grupo',
      'dt_competencia',
    ]);
    const subGrupos = cleanerRows.map(
      (r) =>
        SigtapSubGrupo.fromDTO(
          {
            co_grupo: r.co_grupo,
            co_sub_grupo: r.co_sub_grupo,
            no_sub_grupo: r.no_sub_grupo,
            dt_competencia: r.dt_competencia,
        }
        )
    );

    await this.repo.saveSubGrupos(subGrupos);
  }

  private async importFormaOrganizacao(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_FORMA_ORGANIZACAO'];
    const rows = await this.parseFile(
      files[layout.file.toLowerCase()],
      layout.fields,
    );
    const cleanerRows = DataCleaner.cleanAll(rows, [
      'co_grupo',
      'co_sub_grupo',
      'co_forma_organizacao',
      'no_forma_organizacao',
      'dt_competencia',
    ]);
    const formas = cleanerRows.map(
      (r) =>
        new SigtapFormaOrganizacao(
          r.co_grupo,
          r.co_sub_grupo,
          r.co_forma_organizacao,
          r.no_forma_organizacao,
          r.dt_competencia,
        ),
    );
    await this.repo.saveFormas(formas);
  }

  private async importProcedimentos(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_PROCEDIMENTO'];
    const rows = await this.parseFile(
      files[layout.file.toLowerCase()],
      layout.fields,
    );
    const cleanerRows = DataCleaner.cleanAll(rows, [
      'co_procedimento',
      'no_procedimento',
      'dt_competencia',
    ]);
    const procs = cleanerRows.map(
      (r) => {
        const co_procedimento = r.co_procedimento || '';
        const co_grupo = co_procedimento.slice(0, 2);
        const co_sub_grupo = co_procedimento.slice(2, 4);
        const co_forma_organizacao = co_procedimento.slice(4, 6);

        return new SigtapProcedimento(
          co_grupo,
          co_sub_grupo,
          co_forma_organizacao,
          co_procedimento,
          r.no_procedimento,
          parseInt(r.qt_maxima_execucao, 10) || 0,
          parseInt(r.qt_dias_permanencia, 10) || 0,
          parseInt(r.qt_pontos, 10) || 0,
          parseInt(r.vl_idade_minima, 10) || 0,
          parseInt(r.vl_idade_maxima, 10) || 0,
          parseFloat(
            (parseInt(r.vl_servico_hospitalar, 10) / 100).toFixed(2),
          ) || 0,
          parseFloat(
            (parseInt(r.vl_servico_ambulatorial, 10) / 100).toFixed(2),
          ) || 0,
          parseFloat(
            (parseInt(r.vl_servico_profissional, 10) / 100).toFixed(2),
          ) || 0,
          parseInt(r.qt_tempo_permanencia, 10) || 0,
          r.dt_competencia,
        );
      }
    );
    await this.repo.saveProcedimentos(procs);
  }

  private async importProcedimentoCid(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_CID'];
    const rows = await this.parseFile(
      files[layout.file.toLowerCase()],
      layout.fields,
    );
    const cleanerRows = DataCleaner.cleanAll(rows, [
      'co_procedimento',
      'co_cid',
      'dt_competencia',
      'st_principal',
    ]);
    const procsCid = cleanerRows.map(
      (r) =>
        new SigtapProcedimentoCid(
          r.co_procedimento,
          r.co_cid,
          r.dt_competencia,
          r.st_principal,
        ),
    );
    await this.repo.saveProcedimentoCids(procsCid);
  }

  private async importCid(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_CID'];
    const rows = await this.parseFile(
      files[layout.file.toLowerCase()],
      layout.fields,
    );
    const cleanerRows = DataCleaner.cleanAll(rows, [
      'co_cid',
      'no_cid',
      'tp_agravo',
      'tp_sexo',
      'tp_estadio',
      'vl_campos_irradiados',
    ]);
    const cids = cleanerRows.map(
      (r) =>
         SigtapCid.fromDTO({
          co_cid: r.co_cid,
          no_cid: r.no_cid,
          tp_agravo: r.tp_agravo,
          tp_sexo: r.tp_sexo,
          tp_estadio: r.tp_estadio,
          vl_campos_irradiados: r.vl_campos_irradiados ? parseInt(r.vl_campos_irradiados, 10) : null,}
        ),
    );
    await this.repo.saveCids(cids);
  }

  private async importProcedimentoCompetencia(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_COMPETENCIA'];
    const rows = await this.parseFile(
      files[layout.file.toLowerCase()],
      layout.fields,
    );
    const cleanerRows = DataCleaner.cleanAll(rows, [
      'co_procedimento',
      'dt_competencia',
    ]);
    const procsComp = cleanerRows.map(
      (r) =>
        new SigtapProcedimentoCompetencia(r.co_procedimento, r.dt_competencia),
    );
    await this.repo.saveProcedimentoCompetencias(procsComp);
  }

  private async importProcedimentoCompativel(files: Record<string, string>) {

    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_COMPATIVEL'];

    const rows = await this.parseFile(
      files[layout.file.toLowerCase()],
      layout.fields,
    );;

    const cleanerRows = DataCleaner.cleanAll(KeyNormalizer.normalizeArray(rows), [
      'co_procedimento_principal',
      'co_registro_principal',
      'co_procedimento_compativel',
      'co_registro_compativel',
      'tp_compatibilidade',
      'qt_permitida',
      'dt_competencia',
    ]);

    const procsComp = cleanerRows.map(
      (prc) => {
    return SigtapProcedimentoCompativel.fromDTO({
        co_procedimento_principal: prc.co_procedimento_principal,
        co_registro_principal: prc.co_registro_principal,
        co_procedimento_compativel: prc.co_procedimento_compativel,
        co_registro_compativel: prc.co_registro_compativel,
        tp_compatibilidade: prc.tp_compatibilidade,
        qt_permitida: parseInt(prc.qt_permitida, 0),
        dt_competencia: prc.dt_competencia,
    });
},
    );

    await this.repo.saveProcedimentoCompativeis(procsComp);
  }

  private async importModalidades(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_MODALIDADE'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_modalidade', 'no_modalidade', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapModalidade(r.co_modalidade, r.no_modalidade, r.dt_competencia));
    await this.repo.saveModalidades(list);
  }

  private async importHabilitacoes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_HABILITACAO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_habilitacao', 'no_habilitacao', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapHabilitacao(r.co_habilitacao, r.no_habilitacao, r.dt_competencia));
    await this.repo.saveHabilitacoes(list);
  }

  private async importGrupoHabilitacoes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_GRUPO_HABILITACAO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['nu_grupo_habilitacao', 'no_grupo_habilitacao', 'ds_grupo_habilitacao']);
    const list = cleaned.map(r => new SigtapGrupoHabilitacao(r.nu_grupo_habilitacao, r.no_grupo_habilitacao, r.ds_grupo_habilitacao));
    await this.repo.saveGrupoHabilitacoes(list);
  }

  private async importDetalhes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_DETALHE'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_detalhe', 'no_detalhe', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapDetalhe(r.co_detalhe, r.no_detalhe, r.dt_competencia));
    await this.repo.saveDetalhes(list);
  }

  private async importFinanciamentos(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_FINANCIAMENTO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_financiamento', 'no_financiamento', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapFinanciamento(r.co_financiamento, r.no_financiamento, r.dt_competencia));
    await this.repo.saveFinanciamentos(list);
  }

  private async importComponenteRedes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_COMPONENTE_REDE'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_componente_rede', 'no_componente_rede', 'co_rede_atencao']);
    const list = cleaned.map(r => new SigtapComponenteRede(r.co_componente_rede, r.no_componente_rede, r.co_rede_atencao));
    await this.repo.saveComponenteRedes(list);
  }

  private async importRedeAtencoes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_REDE_ATENCAO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_rede_atencao', 'no_rede_atencao']);
    const list = cleaned.map(r => new SigtapRedeAtencao(r.co_rede_atencao, r.no_rede_atencao));
    await this.repo.saveRedeAtencoes(list);
  }

  private async importRegistros(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_REGISTRO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_registro', 'no_registro', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapRegistro(r.co_registro, r.no_registro, r.dt_competencia));
    await this.repo.saveRegistros(list);
  }

  private async importRegraCondicionadas(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_REGRA_CONDICIONADA'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_regra_condicionada', 'no_regra_condicionada', 'ds_regra_condicionada']);
    const list = cleaned.map(r => new SigtapRegraCondicionada(r.co_regra_condicionada, r.no_regra_condicionada, r.ds_regra_condicionada));
    await this.repo.saveRegraCondicionadas(list);
  }

  private async importRenases(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_RENASES'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_renases', 'no_renases']);
    const list = cleaned.map(r => new SigtapRenases(r.co_renases, r.no_renases));
    await this.repo.saveRenases(list);
  }

  private async importRubricas(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_RUBRICA'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_rubrica', 'no_rubrica', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapRubrica(r.co_rubrica, r.no_rubrica, r.dt_competencia));
    await this.repo.saveRubricas(list);
  }

  private async importServicos(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_SERVICO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_servico', 'no_servico', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapServico(r.co_servico, r.no_servico, r.dt_competencia));
    await this.repo.saveServicos(list);
  }

  private async importServicoClassificacoes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_SERVICO_CLASSIFICACAO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_servico', 'co_classificacao', 'no_classificacao', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapServicoClassificacao(r.co_servico, r.co_classificacao, r.no_classificacao, r.dt_competencia));
    await this.repo.saveServicoClassificacoes(list);
  }

  private async importSiaSihs(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_SIA_SIH'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento_sia_sih', 'no_procedimento_sia_sih', 'tp_procedimento', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapSiaSih(r.co_procedimento_sia_sih, r.no_procedimento_sia_sih, r.tp_procedimento, r.dt_competencia));
    await this.repo.saveSiaSihs(list);
  }

  private async importTusses(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_TUSS'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_tuss', 'no_tuss']);
    const list = cleaned.map(r => new SigtapTuss(r.co_tuss, r.no_tuss));
    await this.repo.saveTusses(list);
  }

  private async importOcupacoes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_OCUPACAO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_ocupacao', 'no_ocupacao']);
    const list = cleaned.map(r => new SigtapOcupacao(r.co_ocupacao, r.no_ocupacao));
    await this.repo.saveOcupacoes(list);
  }

  private async importDescricoes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_DESCRICAO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'ds_procedimento', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapDescricao(r.co_procedimento, r.ds_procedimento, r.dt_competencia));
    await this.repo.saveDescricoes(list);
  }

  private async importDescricaoDetalhes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['TB_DESCRICAO_DETALHE'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_detalhe', 'ds_detalhe', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapDescricaoDetalhe(r.co_detalhe, r.ds_detalhe, r.dt_competencia));
    await this.repo.saveDescricaoDetalhes(list);
  }

  private async importProcedimentoHabilitacoes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_HABILITACAO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_habilitacao', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoHabilitacao(r.co_procedimento, r.co_habilitacao, r.nu_grupo_habilitacao, r.dt_competencia));
    await this.repo.saveProcedimentoHabilitacoes(list);
  }

  private async importProcedimentoIncrementos(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_INCREMENTO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_habilitacao', 'vl_percentual_sh', 'vl_percentual_sa', 'vl_percentual_sp', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoIncremento(
      r.co_procedimento,
      r.co_habilitacao,
      parseFloat(r.vl_percentual_sh) || 0,
      parseFloat(r.vl_percentual_sa) || 0,
      parseFloat(r.vl_percentual_sp) || 0,
      r.dt_competencia
    ));
    await this.repo.saveProcedimentoIncrementos(list);
  }

  private async importProcedimentoLeitos(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_LEITO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_tipo_leito', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoLeito(r.co_procedimento, r.co_tipo_leito, r.dt_competencia));
    await this.repo.saveProcedimentoLeitos(list);
  }

  private async importProcedimentoModalidades(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_MODALIDADE'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_modalidade', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoModalidade(r.co_procedimento, r.co_modalidade, r.dt_competencia));
    await this.repo.saveProcedimentoModalidades(list);
  }

  private async importProcedimentoOcupacoes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_OCUPACAO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_ocupacao', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoOcupacao(r.co_procedimento, r.co_ocupacao, r.dt_competencia));
    await this.repo.saveProcedimentoOcupacoes(list);
  }

  private async importProcedimentoOrigens(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_ORIGEM'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_procedimento_origem', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoOrigem(r.co_procedimento, r.co_procedimento_origem, r.dt_competencia));
    await this.repo.saveProcedimentoOrigens(list);
  }

  private async importProcedimentoRegistros(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_REGISTRO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_registro', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoRegistro(r.co_procedimento, r.co_registro, r.dt_competencia));
    await this.repo.saveProcedimentoRegistros(list);
  }

  private async importProcedimentoRegraConds(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_REGRA_COND'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_regra_condicionada']);
    const list = cleaned.map(r => new SigtapProcedimentoRegraCond(r.co_procedimento, r.co_regra_condicionada));
    await this.repo.saveProcedimentoRegraConds(list);
  }

  private async importProcedimentoRenases(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_RENASES'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_renases']);
    const list = cleaned.map(r => new SigtapProcedimentoRenases(r.co_procedimento, r.co_renases));
    await this.repo.saveProcedimentoRenases(list);
  }

  private async importProcedimentoServicos(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_SERVICO'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_servico', 'co_classificacao', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoServico(r.co_procedimento, r.co_servico, r.co_classificacao, r.dt_competencia));
    await this.repo.saveProcedimentoServicos(list);
  }

  private async importProcedimentoSiaSihs(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_SIA_SIH'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_procedimento_sia_sih', 'tp_procedimento', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoSiaSih(r.co_procedimento, r.co_procedimento_sia_sih, r.tp_procedimento, r.dt_competencia));
    await this.repo.saveProcedimentoSiaSihs(list);
  }

  private async importProcedimentoTusses(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_TUSS'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_tuss']);
    const list = cleaned.map(r => new SigtapProcedimentoTuss(r.co_procedimento, r.co_tuss));
    await this.repo.saveProcedimentoTusses(list);
  }

  private async importProcedimentoCompRedes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_COMPONENTE_REDE'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_componente_rede']);
    const list = cleaned.map(r => new SigtapProcedimentoCompRede(r.co_procedimento, r.co_componente_rede));
    await this.repo.saveProcedimentoCompRedes(list);
  }

  private async importProcedimentoDetalhes(files: Record<string, string>) {
    const layout = SIGTAP_LAYOUTS['RL_PROCEDIMENTO_DETALHE'];
    const rows = await this.parseFile(files[layout.file.toLowerCase()], layout.fields);
    const cleaned = DataCleaner.cleanAll(rows, ['co_procedimento', 'co_detalhe', 'dt_competencia']);
    const list = cleaned.map(r => new SigtapProcedimentoDetalhe(r.co_procedimento, r.co_detalhe, r.dt_competencia));
    await this.repo.saveProcedimentoDetalhes(list);
  }
}
