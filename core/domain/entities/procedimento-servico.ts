export class SigtapProcedimentoServico {
  private readonly _co_procedimento: string;
  private readonly _co_servico: string;
  private readonly _co_classificacao: string;
  private readonly _dt_competencia: string;

  constructor(
    co_procedimento: string,
    co_servico: string,
    co_classificacao: string,
    dt_competencia: string,
  ) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_servico) throw new Error('"co_servico" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_servico = co_servico;
    this._co_classificacao = co_classificacao;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_servico(): string { return this._co_servico; }
  get co_classificacao(): string { return this._co_classificacao; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_servico: this._co_servico,
      co_classificacao: this._co_classificacao,
      dt_competencia: this._dt_competencia,
    };
  }
}
