export class SigtapProcedimentoRenases {
  private readonly _co_procedimento: string;
  private readonly _co_renases: string;

  constructor(co_procedimento: string, co_renases: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_renases) throw new Error('"co_renases" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_renases = co_renases;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_renases(): string { return this._co_renases; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_renases: this._co_renases,
    };
  }
}
