export class SigtapComponenteRede {
  private readonly _co_componente_rede: string;
  private readonly _no_componente_rede: string;
  private readonly _co_rede_atencao: string;

  constructor(co_componente_rede: string, no_componente_rede: string, co_rede_atencao: string) {
    if (!co_componente_rede) throw new Error('"co_componente_rede" é obrigatório');
    this._co_componente_rede = co_componente_rede;
    this._no_componente_rede = no_componente_rede;
    this._co_rede_atencao = co_rede_atencao;
  }

  get co_componente_rede(): string { return this._co_componente_rede; }
  get no_componente_rede(): string { return this._no_componente_rede; }
  get co_rede_atencao(): string { return this._co_rede_atencao; }

  public paraDTO() {
    return {
      co_componente_rede: this._co_componente_rede,
      no_componente_rede: this._no_componente_rede,
      co_rede_atencao: this._co_rede_atencao,
    };
  }
}
