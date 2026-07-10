export class SigtapModalidade {
  private readonly _co_modalidade: string;
  private readonly _no_modalidade: string;
  private readonly _dt_competencia: string;

  constructor(co_modalidade: string, no_modalidade: string, dt_competencia: string) {
    if (!co_modalidade) throw new Error('"co_modalidade" é obrigatório');
    if (!no_modalidade) throw new Error('"no_modalidade" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_modalidade = co_modalidade;
    this._no_modalidade = no_modalidade;
    this._dt_competencia = dt_competencia;
  }

  get co_modalidade(): string { return this._co_modalidade; }
  get no_modalidade(): string { return this._no_modalidade; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_modalidade: this._co_modalidade,
      no_modalidade: this._no_modalidade,
      dt_competencia: this._dt_competencia,
    };
  }
}
