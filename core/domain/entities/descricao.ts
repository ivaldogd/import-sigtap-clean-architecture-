export class SigtapDescricao {
  private readonly _co_procedimento: string;
  private readonly _ds_procedimento: string;
  private readonly _dt_competencia: string;

  constructor(co_procedimento: string, ds_procedimento: string, dt_competencia: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._ds_procedimento = ds_procedimento;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get ds_procedimento(): string { return this._ds_procedimento; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      ds_procedimento: this._ds_procedimento,
      dt_competencia: this._dt_competencia,
    };
  }
}
