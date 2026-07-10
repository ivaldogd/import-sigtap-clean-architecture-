export class SigtapProcedimentoRegraCond {
  private readonly _co_procedimento: string;
  private readonly _co_regra_condicionada: string;

  constructor(co_procedimento: string, co_regra_condicionada: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_regra_condicionada) throw new Error('"co_regra_condicionada" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_regra_condicionada = co_regra_condicionada;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_regra_condicionada(): string { return this._co_regra_condicionada; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_regra_condicionada: this._co_regra_condicionada,
    };
  }
}
