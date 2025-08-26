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

    await this.importGrupos(files);
    await this.importSubGrupos(files);
    await this.importFormaOrganizacao(files);
    await this.importProcedimentos(files);
    await this.importProcedimentoCid(files);
    await this.importCid(files);
    await this.importProcedimentoCompetencia(files);
    await this.importProcedimentoCompativel(files);

    fs.rmSync(tempDir, { recursive: true, force: true });
    return { message: 'Importação SIGTAP concluída.' };
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
      'co_grupo',
      'co_sub_grupo',
      'co_forma_organizacao',
      'co_procedimento',
      'no_procedimento',
      'dt_competencia',
    ]);
    const procs = cleanerRows.map(
      (r) =>
        new SigtapProcedimento(
          r.co_grupo,
          r.co_sub_grupo,
          r.co_forma_organizacao,
          r.co_procedimento,
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
        ),
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
}
