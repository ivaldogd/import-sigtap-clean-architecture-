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
  TB_PROCEDIMENTO: {
    file: 'tb_procedimento.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'no_procedimento', start: 11, end: 260, trim: true },
      { name: 'tp_complexidade', start: 261, end: 261, trim: true },
      { name: 'tp_sexo', start: 262, end: 262, trim: true },
      { name: 'qt_maxima_execucao', start: 263, end: 266, trim: true },
      { name: 'qt_dias_permanencia', start: 267, end: 270, trim: true },
      { name: 'qt_pontos', start: 271, end: 274, trim: true },
      { name: 'vl_idade_minima', start: 275, end: 278, trim: true },
      { name: 'vl_idade_maxima', start: 279, end: 282, trim: true },
      { name: 'vl_servico_hospitalar', start: 283, end: 292, trim: true },
      { name: 'vl_servico_ambulatorial', start: 293, end: 302, trim: true },
      { name: 'vl_servico_profissional', start: 303, end: 312, trim: true },
      { name: 'co_financiamento', start: 313, end: 314, trim: true },
      { name: 'co_rubrica', start: 315, end: 320, trim: true },
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
    file: 'rl_procedimento_comp_rede.txt',
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
  RL_PROCEDIMENTO_MODALIDADE: {
    file: 'rl_procedimento_modalidade.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_modalidade', start: 11, end: 12, trim: true },
      { name: 'dt_competencia', start: 13, end: 18, trim: true },
    ],
  },
  RL_PROCEDIMENTO_OCUPACAO: {
    file: 'rl_procedimento_ocupacao.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_ocupacao', start: 11, end: 16, trim: true },
      { name: 'dt_competencia', start: 17, end: 22, trim: true },
    ],
  },
  RL_PROCEDIMENTO_ORIGEM: {
    file: 'rl_procedimento_origem.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_procedimento_origem', start: 11, end: 20, trim: true },
      { name: 'dt_competencia', start: 21, end: 26, trim: true },
    ],
  },
  RL_PROCEDIMENTO_REGISTRO: {
    file: 'rl_procedimento_registro.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_registro', start: 11, end: 12, trim: true },
      { name: 'dt_competencia', start: 13, end: 18, trim: true },
    ],
  },
  RL_PROCEDIMENTO_REGRA_COND: {
    file: 'rl_procedimento_regra_cond.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_regra_condicionada', start: 11, end: 14, trim: true },
    ],
  },
  RL_PROCEDIMENTO_RENASES: {
    file: 'rl_procedimento_renases.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_renases', start: 11, end: 20, trim: true },
    ],
  },
  RL_PROCEDIMENTO_SERVICO: {
    file: 'rl_procedimento_servico.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_servico', start: 11, end: 13, trim: true },
      { name: 'co_classificacao', start: 14, end: 16, trim: true },
      { name: 'dt_competencia', start: 17, end: 22, trim: true },
    ],
  },
  RL_PROCEDIMENTO_SIA_SIH: {
    file: 'rl_procedimento_sia_sih.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_procedimento_sia_sih', start: 11, end: 20, trim: true },
      { name: 'tp_procedimento', start: 21, end: 21, trim: true },
      { name: 'dt_competencia', start: 22, end: 27, trim: true },
    ],
  },
  RL_PROCEDIMENTO_TUSS: {
    file: 'rl_procedimento_tuss.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'co_tuss', start: 11, end: 20, trim: true },
    ],
  },
  TB_MODALIDADE: {
    file: 'tb_modalidade.txt',
    fields: [
      { name: 'co_modalidade', start: 1, end: 2, trim: true },
      { name: 'no_modalidade', start: 3, end: 102, trim: true },
      { name: 'dt_competencia', start: 103, end: 108, trim: true },
    ],
  },
  TB_HABILITACAO: {
    file: 'tb_habilitacao.txt',
    fields: [
      { name: 'co_habilitacao', start: 1, end: 4, trim: true },
      { name: 'no_habilitacao', start: 5, end: 154, trim: true },
      { name: 'dt_competencia', start: 155, end: 160, trim: true },
    ],
  },
  TB_GRUPO_HABILITACAO: {
    file: 'tb_grupo_habilitacao.txt',
    fields: [
      { name: 'nu_grupo_habilitacao', start: 1, end: 4, trim: true },
      { name: 'no_grupo_habilitacao', start: 5, end: 24, trim: true },
      { name: 'ds_grupo_habilitacao', start: 25, end: 274, trim: true },
    ],
  },
  TB_DETALHE: {
    file: 'tb_detalhe.txt',
    fields: [
      { name: 'co_detalhe', start: 1, end: 3, trim: true },
      { name: 'no_detalhe', start: 4, end: 103, trim: true },
      { name: 'dt_competencia', start: 104, end: 109, trim: true },
    ],
  },
  TB_FINANCIAMENTO: {
    file: 'tb_financiamento.txt',
    fields: [
      { name: 'co_financiamento', start: 1, end: 2, trim: true },
      { name: 'no_financiamento', start: 3, end: 102, trim: true },
      { name: 'dt_competencia', start: 103, end: 108, trim: true },
    ],
  },
  TB_COMPONENTE_REDE: {
    file: 'tb_componente_rede.txt',
    fields: [
      { name: 'co_componente_rede', start: 1, end: 10, trim: true },
      { name: 'no_componente_rede', start: 11, end: 160, trim: true },
      { name: 'co_rede_atencao', start: 161, end: 163, trim: true },
    ],
  },
  TB_REDE_ATENCAO: {
    file: 'tb_rede_atencao.txt',
    fields: [
      { name: 'co_rede_atencao', start: 1, end: 3, trim: true },
      { name: 'no_rede_atencao', start: 4, end: 53, trim: true },
    ],
  },
  TB_REGISTRO: {
    file: 'tb_registro.txt',
    fields: [
      { name: 'co_registro', start: 1, end: 2, trim: true },
      { name: 'no_registro', start: 3, end: 52, trim: true },
      { name: 'dt_competencia', start: 53, end: 58, trim: true },
    ],
  },
  TB_REGRA_CONDICIONADA: {
    file: 'tb_regra_condicionada.txt',
    fields: [
      { name: 'co_regra_condicionada', start: 1, end: 4, trim: true },
      { name: 'no_regra_condicionada', start: 5, end: 154, trim: true },
      { name: 'ds_regra_condicionada', start: 155, end: 4154, trim: true },
    ],
  },
  TB_RENASES: {
    file: 'tb_renases.txt',
    fields: [
      { name: 'co_renases', start: 1, end: 10, trim: true },
      { name: 'no_renases', start: 11, end: 160, trim: true },
    ],
  },
  TB_RUBRICA: {
    file: 'tb_rubrica.txt',
    fields: [
      { name: 'co_rubrica', start: 1, end: 6, trim: true },
      { name: 'no_rubrica', start: 7, end: 106, trim: true },
      { name: 'dt_competencia', start: 107, end: 112, trim: true },
    ],
  },
  TB_SERVICO: {
    file: 'tb_servico.txt',
    fields: [
      { name: 'co_servico', start: 1, end: 3, trim: true },
      { name: 'no_servico', start: 4, end: 123, trim: true },
      { name: 'dt_competencia', start: 124, end: 129, trim: true },
    ],
  },
  TB_SERVICO_CLASSIFICACAO: {
    file: 'tb_servico_classificacao.txt',
    fields: [
      { name: 'co_servico', start: 1, end: 3, trim: true },
      { name: 'co_classificacao', start: 4, end: 6, trim: true },
      { name: 'no_classificacao', start: 7, end: 156, trim: true },
      { name: 'dt_competencia', start: 157, end: 162, trim: true },
    ],
  },
  TB_SIA_SIH: {
    file: 'tb_sia_sih.txt',
    fields: [
      { name: 'co_procedimento_sia_sih', start: 1, end: 10, trim: true },
      { name: 'no_procedimento_sia_sih', start: 11, end: 110, trim: true },
      { name: 'tp_procedimento', start: 111, end: 111, trim: true },
      { name: 'dt_competencia', start: 112, end: 117, trim: true },
    ],
  },
  TB_TUSS: {
    file: 'tb_tuss.txt',
    fields: [
      { name: 'co_tuss', start: 1, end: 10, trim: true },
      { name: 'no_tuss', start: 11, end: 460, trim: true },
    ],
  },
  TB_OCUPACAO: {
    file: 'tb_ocupacao.txt',
    fields: [
      { name: 'co_ocupacao', start: 1, end: 6, trim: true },
      { name: 'no_ocupacao', start: 7, end: 156, trim: true },
    ],
  },
  TB_DESCRICAO: {
    file: 'tb_descricao.txt',
    fields: [
      { name: 'co_procedimento', start: 1, end: 10, trim: true },
      { name: 'ds_procedimento', start: 11, end: 4010, trim: true },
      { name: 'dt_competencia', start: 4011, end: 4016, trim: true },
    ],
  },
  TB_DESCRICAO_DETALHE: {
    file: 'tb_descricao_detalhe.txt',
    fields: [
      { name: 'co_detalhe', start: 1, end: 3, trim: true },
      { name: 'ds_detalhe', start: 4, end: 4003, trim: true },
      { name: 'dt_competencia', start: 4004, end: 4009, trim: true },
    ],
  },
};
