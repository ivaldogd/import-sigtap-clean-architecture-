export class SigtapOcupacao {
  private readonly _co_ocupacao: string;
  private readonly _no_ocupacao: string;

  constructor(co_ocupacao: string, no_ocupacao: string) {
    if (!co_ocupacao) throw new Error('"co_ocupacao" é obrigatório');
    this._co_ocupacao = co_ocupacao;
    this._no_ocupacao = no_ocupacao;
  }

  get co_ocupacao(): string { return this._co_ocupacao; }
  get no_ocupacao(): string { return this._no_ocupacao; }

  public paraDTO() {
    return {
      co_ocupacao: this._co_ocupacao,
      no_ocupacao: this._no_ocupacao,
    };
  }
}
