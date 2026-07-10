export class SigtapProcedimentoDetalhe {
  private readonly _co_procedimento: string;
  private readonly _co_detalhe: string;
  private readonly _dt_competencia: string;

  constructor(co_procedimento: string, co_detalhe: string, dt_competencia: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_detalhe) throw new Error('"co_detalhe" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_detalhe = co_detalhe;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_detalhe(): string { return this._co_detalhe; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_detalhe: this._co_detalhe,
      dt_competencia: this._dt_competencia,
    };
  }
}
