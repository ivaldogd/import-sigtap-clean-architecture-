export class SigtapRegistro {
  private readonly _co_registro: string;
  private readonly _no_registro: string;
  private readonly _dt_competencia: string;

  constructor(co_registro: string, no_registro: string, dt_competencia: string) {
    if (!co_registro) throw new Error('"co_registro" é obrigatório');
    this._co_registro = co_registro;
    this._no_registro = no_registro;
    this._dt_competencia = dt_competencia;
  }

  get co_registro(): string { return this._co_registro; }
  get no_registro(): string { return this._no_registro; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_registro: this._co_registro,
      no_registro: this._no_registro,
      dt_competencia: this._dt_competencia,
    };
  }
}
