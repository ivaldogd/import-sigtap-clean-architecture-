export class SigtapDescricaoDetalhe {
  private readonly _co_detalhe: string;
  private readonly _ds_detalhe: string;
  private readonly _dt_competencia: string;

  constructor(co_detalhe: string, ds_detalhe: string, dt_competencia: string) {
    if (!co_detalhe) throw new Error('"co_detalhe" é obrigatório');
    this._co_detalhe = co_detalhe;
    this._ds_detalhe = ds_detalhe;
    this._dt_competencia = dt_competencia;
  }

  get co_detalhe(): string { return this._co_detalhe; }
  get ds_detalhe(): string { return this._ds_detalhe; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_detalhe: this._co_detalhe,
      ds_detalhe: this._ds_detalhe,
      dt_competencia: this._dt_competencia,
    };
  }
}
