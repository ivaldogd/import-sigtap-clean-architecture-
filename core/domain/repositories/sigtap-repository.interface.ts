// core/domain/repositories/sigtap-repository.interface.ts

import { SigtapCid } from "../entities/cid";
import { SigtapFormaOrganizacao } from "../entities/forma-organizacao";
import { SigtapGrupo } from "../entities/grupo";
import { SigtapProcedimento } from "../entities/procedimento";
import { SigtapProcedimentoCid } from "../entities/procedimento-cid";
import { SigtapProcedimentoCompativel } from "../entities/procedimento-compativel";
import { SigtapProcedimentoCompetencia } from "../entities/procedimento-competencia";
import { SigtapSubGrupo } from "../entities/sub-grupo";


export const ISigtapRepository = Symbol('ISigtapRepository');
export interface ISigtapRepository {
  saveGrupos(rows: SigtapGrupo[]): Promise<void>;
  saveSubGrupos(rows: SigtapSubGrupo[]): Promise<void>;
  saveFormas(rows: SigtapFormaOrganizacao[]): Promise<void>;
  saveProcedimentos(rows: SigtapProcedimento[]): Promise<void>;
  saveCids(rows: SigtapCid[]): Promise<void>;
  saveProcedimentoCids(rows: SigtapProcedimentoCid[]): Promise<void>;
  saveProcedimentoCompetencias(rows: SigtapProcedimentoCompetencia[]): Promise<void>;
  saveProcedimentoCompativeis(rows: SigtapProcedimentoCompativel[]): Promise<void>;
}

