export class SigtapProcedimentoSiaSih {
  private readonly _co_procedimento: string;
  private readonly _co_procedimento_sia_sih: string;
  private readonly _tp_procedimento: string;
  private readonly _dt_competencia: string;

  constructor(
    co_procedimento: string,
    co_procedimento_sia_sih: string,
    tp_procedimento: string,
    dt_competencia: string,
  ) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_procedimento_sia_sih) throw new Error('"co_procedimento_sia_sih" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_procedimento_sia_sih = co_procedimento_sia_sih;
    this._tp_procedimento = tp_procedimento;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_procedimento_sia_sih(): string { return this._co_procedimento_sia_sih; }
  get tp_procedimento(): string { return this._tp_procedimento; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_procedimento_sia_sih: this._co_procedimento_sia_sih,
      tp_procedimento: this._tp_procedimento,
      dt_competencia: this._dt_competencia,
    };
  }
}
