export class SigtapRubrica {
  private readonly _co_rubrica: string;
  private readonly _no_rubrica: string;
  private readonly _dt_competencia: string;

  constructor(co_rubrica: string, no_rubrica: string, dt_competencia: string) {
    if (!co_rubrica) throw new Error('"co_rubrica" é obrigatório');
    this._co_rubrica = co_rubrica;
    this._no_rubrica = no_rubrica;
    this._dt_competencia = dt_competencia;
  }

  get co_rubrica(): string { return this._co_rubrica; }
  get no_rubrica(): string { return this._no_rubrica; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_rubrica: this._co_rubrica,
      no_rubrica: this._no_rubrica,
      dt_competencia: this._dt_competencia,
    };
  }
}
