export class SigtapServico {
  private readonly _co_servico: string;
  private readonly _no_servico: string;
  private readonly _dt_competencia: string;

  constructor(co_servico: string, no_servico: string, dt_competencia: string) {
    if (!co_servico) throw new Error('"co_servico" é obrigatório');
    this._co_servico = co_servico;
    this._no_servico = no_servico;
    this._dt_competencia = dt_competencia;
  }

  get co_servico(): string { return this._co_servico; }
  get no_servico(): string { return this._no_servico; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_servico: this._co_servico,
      no_servico: this._no_servico,
      dt_competencia: this._dt_competencia,
    };
  }
}
