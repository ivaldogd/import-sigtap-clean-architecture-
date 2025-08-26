export class SigtapProcedimento {
  private readonly _co_grupo: string;
  private readonly _co_sub_grupo: string;
  private readonly _co_forma_organizacao: string;
  private readonly _co_procedimento: string;
  private readonly _no_procedimento: string;
  private readonly _qt_maxima_execucao: number;
  private readonly _qt_dias_permanencia: number;
  private readonly _qt_pontos: number;
  private readonly _vl_idade_minima: number;
  private readonly _vl_idade_maxima: number;
  private readonly _vl_servico_hospitalar: number;
  private readonly _vl_servico_ambulatorial: number;
  private readonly _vl_servico_profissional: number;
  private readonly _qt_tempo_permanencia: number;
  private readonly _dt_competencia: string;

  constructor(
    co_grupo: string,
    co_sub_grupo: string,
    co_forma_organizacao: string,
    co_procedimento: string,
    no_procedimento: string,
    qt_maxima_execucao: number,
    qt_dias_permanencia: number,
    qt_pontos: number,
    vl_idade_minima: number,
    vl_idade_maxima: number,
    vl_servico_hospitalar: number,
    vl_servico_ambulatorial: number,
    vl_servico_profissional: number,
    qt_tempo_permanencia: number,
    dt_competencia: string,
  ) {
    if (!co_grupo) throw new Error('Campo obrigatório "co_grupo" não pode ser nulo');
    if (!co_sub_grupo) throw new Error('Campo obrigatório "co_sub_grupo" não pode ser nulo');
    if (!co_forma_organizacao) throw new Error('Campo obrigatório "co_forma_organizacao" não pode ser nulo');
    if (!co_procedimento) throw new Error('Campo obrigatório "co_procedimento" não pode ser nulo');
    if (!no_procedimento) throw new Error('Campo obrigatório "no_procedimento" não pode ser nulo');
    if (!dt_competencia) throw new Error('Campo obrigatório "dt_competencia" não pode ser nulo');

    this._co_grupo = co_grupo;
    this._co_sub_grupo = co_sub_grupo;
    this._co_forma_organizacao = co_forma_organizacao;
    this._co_procedimento = co_procedimento;
    this._no_procedimento = no_procedimento;
    this._qt_maxima_execucao = qt_maxima_execucao;
    this._qt_dias_permanencia = qt_dias_permanencia;
    this._qt_pontos = qt_pontos;
    this._vl_idade_minima = vl_idade_minima;
    this._vl_idade_maxima = vl_idade_maxima;
    this._vl_servico_hospitalar = vl_servico_hospitalar;
    this._vl_servico_ambulatorial = vl_servico_ambulatorial;
    this._vl_servico_profissional = vl_servico_profissional;
    this._qt_tempo_permanencia = qt_tempo_permanencia;
    this._dt_competencia = dt_competencia;
  }

  // Getters (encapsulamento)
  get co_grupo(): string { return this._co_grupo; }
  get co_sub_grupo(): string { return this._co_sub_grupo; }
  get co_forma_organizacao(): string { return this._co_forma_organizacao; }
  get co_procedimento(): string { return this._co_procedimento; }
  get no_procedimento(): string { return this._no_procedimento; }
  get qt_maxima_execucao(): number { return this._qt_maxima_execucao; }
  get qt_dias_permanencia(): number { return this._qt_dias_permanencia; }
  get qt_pontos(): number { return this._qt_pontos; }
  get vl_idade_minima(): number { return this._vl_idade_minima; }
  get vl_idade_maxima(): number { return this._vl_idade_maxima; }
  get vl_servico_hospitalar(): number { return this._vl_servico_hospitalar; }
  get vl_servico_ambulatorial(): number { return this._vl_servico_ambulatorial; }
  get vl_servico_profissional(): number { return this._vl_servico_profissional; }
  get qt_tempo_permanencia(): number { return this._qt_tempo_permanencia; }
  get dt_competencia(): string { return this._dt_competencia; }


   // Factory a partir de DTO
  static fromDTO(dto: {
    co_grupo: string;
    co_sub_grupo: string;
    co_forma_organizacao: string;
    co_procedimento: string;
    no_procedimento: string;
    qt_maxima_execucao: number;
    qt_dias_permanencia: number;
    qt_pontos: number;
    vl_idade_minima: number;
    vl_idade_maxima: number;
    vl_servico_hospitalar: number;
    vl_servico_ambulatorial: number;
    vl_servico_profissional: number;
    qt_tempo_permanencia: number;
    dt_competencia: string;
  }): SigtapProcedimento {
    return new SigtapProcedimento(
      dto.co_grupo,
      dto.co_sub_grupo,
      dto.co_forma_organizacao,
      dto.co_procedimento,
      dto.no_procedimento,
      dto.qt_maxima_execucao,
      dto.qt_dias_permanencia,
      dto.qt_pontos,
      dto.vl_idade_minima,
      dto.vl_idade_maxima,
      dto.vl_servico_hospitalar,
      dto.vl_servico_ambulatorial,
      dto.vl_servico_profissional,
      dto.qt_tempo_permanencia,
      dto.dt_competencia,
    );
  }

  // DTO pronto para persistência no banco
  public paraDTO(): Record<string, any> {
    return {
      co_grupo: this._co_grupo,
      co_sub_grupo: this._co_sub_grupo,
      co_forma_organizacao: this._co_forma_organizacao,
      co_procedimento: this._co_procedimento,
      no_procedimento: this._no_procedimento,
      qt_maxima_execucao: this._qt_maxima_execucao,
      qt_dias_permanencia: this._qt_dias_permanencia,
      qt_pontos: this._qt_pontos,
      vl_idade_minima: this._vl_idade_minima,
      vl_idade_maxima: this._vl_idade_maxima,
      vl_servico_hospitalar: this._vl_servico_hospitalar,
      vl_servico_ambulatorial: this._vl_servico_ambulatorial,
      vl_servico_profissional: this._vl_servico_profissional,
      qt_tempo_permanencia: this._qt_tempo_permanencia,
      dt_competencia: this._dt_competencia,
    };
  }
}

