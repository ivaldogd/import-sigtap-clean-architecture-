export class SigtapRenases {
  private readonly _co_renases: string;
  private readonly _no_renases: string;

  constructor(co_renases: string, no_renases: string) {
    if (!co_renases) throw new Error('"co_renases" é obrigatório');
    this._co_renases = co_renases;
    this._no_renases = no_renases;
  }

  get co_renases(): string { return this._co_renases; }
  get no_renases(): string { return this._no_renases; }

  public paraDTO() {
    return {
      co_renases: this._co_renases,
      no_renases: this._no_renases,
    };
  }
}
