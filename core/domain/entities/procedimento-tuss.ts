export class SigtapProcedimentoTuss {
  private readonly _co_procedimento: string;
  private readonly _co_tuss: string;

  constructor(co_procedimento: string, co_tuss: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_tuss) throw new Error('"co_tuss" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_tuss = co_tuss;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_tuss(): string { return this._co_tuss; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_tuss: this._co_tuss,
    };
  }
}
