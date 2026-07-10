export class SigtapTuss {
  private readonly _co_tuss: string;
  private readonly _no_tuss: string;

  constructor(co_tuss: string, no_tuss: string) {
    if (!co_tuss) throw new Error('"co_tuss" é obrigatório');
    this._co_tuss = co_tuss;
    this._no_tuss = no_tuss;
  }

  get co_tuss(): string { return this._co_tuss; }
  get no_tuss(): string { return this._no_tuss; }

  public paraDTO() {
    return {
      co_tuss: this._co_tuss,
      no_tuss: this._no_tuss,
    };
  }
}
