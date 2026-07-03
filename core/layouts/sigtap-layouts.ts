import { FieldDef } from '../ports/fixed-width-parser.port';

// src/core/layouts/sigtap-layouts.ts
export type TableLayout = { file: string; fields: FieldDef[] };
export const SIGTAP_LAYOUTS: Record<string, TableLayout> = {
  RL_EXCECAO_COMPATIBILIDADE: {
    file: 'rl_excecao_compatibilidade.txt',
    fields: [
      { name: 'co_procedimento_restricao', start: 1, end: 10, trim: true },
      { name: 'co_procedimento_principal', start: 11, end: 20, trim: true },
      { name: 'co_registro_principal', start: 21, end: 22, trim: true },
      { name: 'co_procedimento_compatível', start: 23, end: 32, trim: true },
      { name: 'co_registro_compatível', start: 33, end: 34, trim: true },
      { name: 'tp_compatibilidade', start: 35, end: 35, trim: true },
      { name: 'dt_competencia', start: 36, end: 41, trim: true },
    ],
  },
  TB_GRUPO: {
    file: 'tb_grupo.txt',
    fields: [
      { name: 'co_grupo', start: 1, end: 2, trim: true },
      { name: 'no_grupo', start: 3, end: 102, trim: true },
      { name: 'dt_competencia', start: 103, end: 108, trim: true }, // YYYYMM
    ],
  },
  TB_SUB_GRUPO: {
    file: 'tb_sub_grupo.txt',
    fields: [
      { name: 'co_grupo', start: 1, end: 2, trim: true },
      { name: 'co_sub_grupo', start: 3, end: 4, trim: true },
      { name: 'no_sub_grupo', start: 5, end: 104, trim: true },
      { name: 'dt_competencia', start: 105, end: 110, trim: true },
    ],
  },
  TB_FORMA_ORGANIZACAO: {
    file: 'tb_forma_organizacao.txt',
    fields: [
      { name: 'co_grupo', start: 1, end: 2, trim: true },
      { name: 'co_sub_grupo', start: 3, end: 4, trim: true },
      { name: 'co_forma_organizacao', start: 5, end: 6, trim: true },
      { name: 'no_forma_organizacao', start: 7, end: 106, trim: true },
      { name: 'dt_competencia', start: 107, end: 112, trim: true },
    ],
  },
  // Exemplos de “ganchos” (preencher conforme layout oficial):
  TB_PROCEDIMENTO: {
    file: 'tb_procedimento.txt',
    fields: [
      { name: 'co_grupo', start: 1, end: 2, trim: true },
      { name: 'co_sub_grupo', start: 3, end: 4, trim: true },
      { name: 'co_forma_organizacao', start: 5, end: 6, trim: true },
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'no_procedimento', start: 11, end: 260, trim: true },
      { name: 'qt_maxima_execucao', start: 263, end: 266, trim: true },
      { name: 'qt_dias_permanencia', start: 267, end: 270, trim: true },
      { name: 'qt_pontos', start: 271, end: 274, trim: true },
      { name: 'vl_idade_minima', start: 275, end: 278, trim: true },
      { name: 'vl_idade_maxima', start: 279, end: 282, trim: true },
      { name: 'vl_servico_hospitalar', start: 283, end: 292, trim: true },
      { name: 'vl_servico_ambulatorial', start: 293, end: 302, trim: true },
      { name: 'vl_servico_profissional', start: 303, end: 312, trim: true },
      { name: 'qt_tempo_permanencia', start: 321, end: 324, trim: true },
      { name: 'dt_competencia', start: 325, end: 330, trim: true },
    ],
  },
  RL_PROCEDIMENTO_COMPETENCIA: {
    file: 'rl_procedimento_competencia.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'dt_competencia', start: 11, end: 16, trim: true }, // YYYYMM
    ],
  },
  RL_PROCEDIMENTO_COMPATIVEL: {
    file: 'rl_procedimento_compativel.txt',
    fields: [
      { name: 'co_procedimento_principal', start: 1, end: 10, trim: true },
      { name: 'co_registro_principal', start: 11, end: 12, trim: true },
      { name: 'co_procedimento_compativel', start: 13, end: 22, trim: true },
      { name: 'co_registro_compativel', start: 23, end: 24, trim: true },
      { name: 'tp_compatibilidade', start: 25, end: 25, trim: true },
      { name: 'qt_permitida', start: 26, end: 29, trim: true },
      { name: 'dt_competencia', start: 30, end: 35, trim: true }, // YYYYMM
    ],
  },
  RL_PROCEDIMENTO_CID: {
    file: 'rl_procedimento_cid.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_cid', start: 11, end: 14, trim: true },
      { name: 'st_principal', start: 15, end: 15, trim: true },
      { name: 'dt_competencia', start: 16, end: 21, trim: true }, // YYYYMM
    ],
  },
  TB_CID: {
    file: 'tb_cid.txt',
    fields: [
      { name: 'co_cid', start: 1, end: 4, trim: true },
      { name: 'no_cid', start: 5, end: 104, trim: true },
      { name: 'tp_agravo', start: 105, end: 105, trim: true },
      { name: 'tp_sexo', start: 106, end: 106, trim: true },
      { name: 'tp_estadio', start: 107, end: 107, trim: true },
      { name: 'vl_campos_irradiados', start: 108, end: 111, trim: true },
    ],
  },
  RL_PROCEDIMENTO_COMPONENTE_REDE: {
    file: 'rl_procedimento_componente_rede.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_componente_rede', start: 11, end: 20, trim: true },
    ],
  },
  RL_PROCEDIMENTO_DETALHE: {
    file: 'rl_procedimento_detalhe.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_detalhe', start: 11, end: 13, trim: true },
      { name: 'dt_competencia', start: 14, end: 19, trim: true },
    ],
  },
  RL_PROCEDIMENTO_HABILITACAO: {
    file: 'rl_procedimento_habilitacao.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_habilitacao', start: 11, end: 14, trim: true },
      { name: 'nu_grupo_habilitacao', start: 15, end: 18, trim: true },
      { name: 'dt_competencia', start: 19, end: 24, trim: true },
    ],
  },
  RL_PROCEDIMENTO_INCREMENTO: {
    file: 'rl_procedimento_incremento.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_habilitacao', start: 11, end: 14, trim: true },
      { name: 'vl_percentual_sh', start: 15, end: 21, trim: true },
      { name: 'vl_percentual_sa', start: 22, end: 28, trim: true },
      { name: 'vl_percentual_sp', start: 29, end: 35, trim: true },
      { name: 'dt_competencia', start: 36, end: 41, trim: true },
    ],
  },
  RL_PROCEDIMENTO_LEITO: {
    file: 'rl_procedimento_leito.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_tipo_leito', start: 11, end: 12, trim: true },
      { name: 'dt_competencia', start: 13, end: 18, trim: true },
    ],
  },
};
