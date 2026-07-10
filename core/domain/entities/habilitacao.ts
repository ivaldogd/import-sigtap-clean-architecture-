export class SigtapHabilitacao {
  private readonly _co_habilitacao: string;
  private readonly _no_habilitacao: string;
  private readonly _dt_competencia: string;

  constructor(co_habilitacao: string, no_habilitacao: string, dt_competencia: string) {
    if (!co_habilitacao) throw new Error('"co_habilitacao" é obrigatório');
    if (!no_habilitacao) throw new Error('"no_habilitacao" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_habilitacao = co_habilitacao;
    this._no_habilitacao = no_habilitacao;
    this._dt_competencia = dt_competencia;
  }

  get co_habilitacao(): string { return this._co_habilitacao; }
  get no_habilitacao(): string { return this._no_habilitacao; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_habilitacao: this._co_habilitacao,
      no_habilitacao: this._no_habilitacao,
      dt_competencia: this._dt_competencia,
    };
  }
}
