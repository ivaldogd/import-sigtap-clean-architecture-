export class SigtapProcedimentoModalidade {
  private readonly _co_procedimento: string;
  private readonly _co_modalidade: string;
  private readonly _dt_competencia: string;

  constructor(co_procedimento: string, co_modalidade: string, dt_competencia: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_modalidade) throw new Error('"co_modalidade" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_modalidade = co_modalidade;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_modalidade(): string { return this._co_modalidade; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_modalidade: this._co_modalidade,
      dt_competencia: this._dt_competencia,
    };
  }
}
