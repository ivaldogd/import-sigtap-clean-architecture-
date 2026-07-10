export class SigtapFinanciamento {
  private readonly _co_financiamento: string;
  private readonly _no_financiamento: string;
  private readonly _dt_competencia: string;

  constructor(co_financiamento: string, no_financiamento: string, dt_competencia: string) {
    if (!co_financiamento) throw new Error('"co_financiamento" é obrigatório');
    this._co_financiamento = co_financiamento;
    this._no_financiamento = no_financiamento;
    this._dt_competencia = dt_competencia;
  }

  get co_financiamento(): string { return this._co_financiamento; }
  get no_financiamento(): string { return this._no_financiamento; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_financiamento: this._co_financiamento,
      no_financiamento: this._no_financiamento,
      dt_competencia: this._dt_competencia,
    };
  }
}
