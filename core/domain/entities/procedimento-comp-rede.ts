export class SigtapProcedimentoCompRede {
  private readonly _co_procedimento: string;
  private readonly _co_componente_rede: string;

  constructor(co_procedimento: string, co_componente_rede: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_componente_rede) throw new Error('"co_componente_rede" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_componente_rede = co_componente_rede;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_componente_rede(): string { return this._co_componente_rede; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_componente_rede: this._co_componente_rede,
    };
  }
}
