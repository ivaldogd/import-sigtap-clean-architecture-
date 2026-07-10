export class SigtapProcedimentoOrigem {
  private readonly _co_procedimento: string;
  private readonly _co_procedimento_origem: string;
  private readonly _dt_competencia: string;

  constructor(co_procedimento: string, co_procedimento_origem: string, dt_competencia: string) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_procedimento_origem) throw new Error('"co_procedimento_origem" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_procedimento_origem = co_procedimento_origem;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_procedimento_origem(): string { return this._co_procedimento_origem; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_procedimento_origem: this._co_procedimento_origem,
      dt_competencia: this._dt_competencia,
    };
  }
}
