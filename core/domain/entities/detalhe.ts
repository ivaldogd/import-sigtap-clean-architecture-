export class SigtapDetalhe {
  private readonly _co_detalhe: string;
  private readonly _no_detalhe: string;
  private readonly _dt_competencia: string;

  constructor(co_detalhe: string, no_detalhe: string, dt_competencia: string) {
    if (!co_detalhe) throw new Error('"co_detalhe" é obrigatório');
    this._co_detalhe = co_detalhe;
    this._no_detalhe = no_detalhe;
    this._dt_competencia = dt_competencia;
  }

  get co_detalhe(): string { return this._co_detalhe; }
  get no_detalhe(): string { return this._no_detalhe; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_detalhe: this._co_detalhe,
      no_detalhe: this._no_detalhe,
      dt_competencia: this._dt_competencia,
    };
  }
}
