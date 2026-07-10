export class SigtapRedeAtencao {
  private readonly _co_rede_atencao: string;
  private readonly _no_rede_atencao: string;

  constructor(co_rede_atencao: string, no_rede_atencao: string) {
    if (!co_rede_atencao) throw new Error('"co_rede_atencao" é obrigatório');
    this._co_rede_atencao = co_rede_atencao;
    this._no_rede_atencao = no_rede_atencao;
  }

  get co_rede_atencao(): string { return this._co_rede_atencao; }
  get no_rede_atencao(): string { return this._no_rede_atencao; }

  public paraDTO() {
    return {
      co_rede_atencao: this._co_rede_atencao,
      no_rede_atencao: this._no_rede_atencao,
    };
  }
}
