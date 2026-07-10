export class SigtapProcedimentoOcupacao {
  private readonly _co_procedimento: string;
  private readonly _co_ocupacao: string;
  private readonly _dt_competencia: string;

  constructor(co_procedimento: string, co_ocupacao: string, dt_competencia: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_ocupacao) throw new Error('"co_ocupacao" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_ocupacao = co_ocupacao;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_ocupacao(): string { return this._co_ocupacao; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_ocupacao: this._co_ocupacao,
      dt_competencia: this._dt_competencia,
    };
  }
}
