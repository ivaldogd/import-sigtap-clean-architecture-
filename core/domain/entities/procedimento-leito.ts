export class SigtapProcedimentoLeito {
  private readonly _co_procedimento: string;
  private readonly _co_tipo_leito: string;
  private readonly _dt_competencia: string;

  constructor(co_procedimento: string, co_tipo_leito: string, dt_competencia: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_tipo_leito) throw new Error('"co_tipo_leito" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_tipo_leito = co_tipo_leito;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_tipo_leito(): string { return this._co_tipo_leito; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_tipo_leito: this._co_tipo_leito,
      dt_competencia: this._dt_competencia,
    };
  }
}
