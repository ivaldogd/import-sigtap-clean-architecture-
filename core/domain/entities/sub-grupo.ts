export class SigtapSubGrupo {
  private readonly _co_grupo: string;
  private readonly _co_sub_grupo: string;
  private readonly _no_sub_grupo: string;
  private readonly _dt_competencia: string;

  constructor(
    co_grupo: string,
    co_sub_grupo: string,
    no_sub_grupo: string,
    dt_competencia: string,
  ) {
    if (!co_grupo) throw new Error('Campo obrigatório "co_grupo" não pode ser nulo');
    if (!co_sub_grupo) throw new Error('Campo obrigatório "co_sub_grupo" não pode ser nulo');
    if (!no_sub_grupo) throw new Error('Campo obrigatório "no_sub_grupo" não pode ser nulo');
    if (!dt_competencia) throw new Error('Campo obrigatório "dt_competencia" não pode ser nulo');

    if (co_grupo.length !== 2) throw new Error('O campo "co_grupo" deve ter exatamente 2 caracteres');
    if (co_sub_grupo.length !== 2) throw new Error('O campo "co_sub_grupo" deve ter exatamente 2 caracteres');
    if (dt_competencia.length !== 6) throw new Error('O campo "dt_competencia" deve ter exatamente 6 caracteres (AAAAMM)');

    this._co_grupo = co_grupo;
    this._co_sub_grupo = co_sub_grupo;
    this._no_sub_grupo = no_sub_grupo.trim();
    this._dt_competencia = dt_competencia;
  }

  // Getters expõem o domínio
  get co_grupo(): string {
    return this._co_grupo;
  }

  get co_sub_grupo(): string {
    return this._co_sub_grupo;
  }

  get no_sub_grupo(): string {
    return this._no_sub_grupo;
  }

  get dt_competencia(): string {
    return this._dt_competencia;
  }

  // Método de domínio para verificar se é da mesma competência
  public mesmaCompetencia(outra: SigtapSubGrupo): boolean {
    return this._dt_competencia === outra.dt_competencia;
  }

  // Método de fábrica a partir de objeto bruto (DTO do banco)
  static fromDTO(dto: {
    co_grupo: string;
    co_sub_grupo: string;
    no_sub_grupo: string;
    dt_competencia: string;
  }): SigtapSubGrupo {
    return new SigtapSubGrupo(
      dto.co_grupo,
      dto.co_sub_grupo,
      dto.no_sub_grupo,
      dto.dt_competencia,
    );
  }

  // Método para converter para DTO (persistência)
  public paraDTO(): {
    co_grupo: string;
    co_sub_grupo: string;
    no_sub_grupo: string;
    dt_competencia: string;
  } {
    return {
      co_grupo: this._co_grupo,
      co_sub_grupo: this._co_sub_grupo,
      no_sub_grupo: this._no_sub_grupo,
      dt_competencia: this._dt_competencia,
    };
  }
}
