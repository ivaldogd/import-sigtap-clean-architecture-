export class SigtapProcedimentoHabilitacao {
  private readonly _co_procedimento: string;
  private readonly _co_habilitacao: string;
  private readonly _nu_grupo_habilitacao: string;
  private readonly _dt_competencia: string;

  constructor(
    co_procedimento: string,
    co_habilitacao: string,
    nu_grupo_habilitacao: string,
    dt_competencia: string,
  ) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_habilitacao) throw new Error('"co_habilitacao" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_habilitacao = co_habilitacao;
    this._nu_grupo_habilitacao = nu_grupo_habilitacao;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_habilitacao(): string { return this._co_habilitacao; }
  get nu_grupo_habilitacao(): string { return this._nu_grupo_habilitacao; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_habilitacao: this._co_habilitacao,
      nu_grupo_habilitacao: this._nu_grupo_habilitacao,
      dt_competencia: this._dt_competencia,
    };
  }
}
