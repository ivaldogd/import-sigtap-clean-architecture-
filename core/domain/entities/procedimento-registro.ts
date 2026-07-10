export class SigtapProcedimentoRegistro {
  private readonly _co_procedimento: string;
  private readonly _co_registro: string;
  private readonly _dt_competencia: string;

  constructor(co_procedimento: string, co_registro: string, dt_competencia: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_registro) throw new Error('"co_registro" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_registro = co_registro;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_registro(): string { return this._co_registro; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_registro: this._co_registro,
      dt_competencia: this._dt_competencia,
    };
  }
}
