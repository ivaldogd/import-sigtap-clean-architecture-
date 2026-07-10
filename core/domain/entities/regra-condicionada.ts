export class SigtapRegraCondicionada {
  private readonly _co_regra_condicionada: string;
  private readonly _no_regra_condicionada: string;
  private readonly _ds_regra_condicionada: string;

  constructor(
    co_regra_condicionada: string,
    no_regra_condicionada: string,
    ds_regra_condicionada: string,
  ) {
    if (!co_regra_condicionada) throw new Error('"co_regra_condicionada" é obrigatório');
    this._co_regra_condicionada = co_regra_condicionada;
    this._no_regra_condicionada = no_regra_condicionada;
    this._ds_regra_condicionada = ds_regra_condicionada;
  }

  get co_regra_condicionada(): string { return this._co_regra_condicionada; }
  get no_regra_condicionada(): string { return this._no_regra_condicionada; }
  get ds_regra_condicionada(): string { return this._ds_regra_condicionada; }

  public paraDTO() {
    return {
      co_regra_condicionada: this._co_regra_condicionada,
      no_regra_condicionada: this._no_regra_condicionada,
      ds_regra_condicionada: this._ds_regra_condicionada,
    };
  }
}
