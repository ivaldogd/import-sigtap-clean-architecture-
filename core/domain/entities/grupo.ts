export class SigtapGrupo {
  private readonly _co_grupo: string;
  private readonly _no_grupo: string;
  private readonly _dt_competencia: string;

  constructor(co_grupo: string, no_grupo: string, dt_competencia: string) {
    if (!co_grupo) throw new Error('Campo obrigatório "co_grupo" não pode ser nulo');
    if (!no_grupo) throw new Error('Campo obrigatório "no_grupo" não pode ser nulo');
    if (!dt_competencia) throw new Error('Campo obrigatório "dt_competencia" não pode ser nulo');

    this._co_grupo = co_grupo;
    this._no_grupo = no_grupo;
    this._dt_competencia = dt_competencia;
  }

  // Getters no formato snake_case (iguais ao banco)
  get co_grupo(): string {
    return this._co_grupo;
  }

  get no_grupo(): string {
    return this._no_grupo;
  }

  get dt_competencia(): string {
    return this._dt_competencia;
  }

  // DTO no mesmo formato do banco
  public paraDTO(): { co_grupo: string; no_grupo: string; dt_competencia: string } {
    return {
      co_grupo: this._co_grupo,
      no_grupo: this._no_grupo,
      dt_competencia: this._dt_competencia,
    };
  }
}
