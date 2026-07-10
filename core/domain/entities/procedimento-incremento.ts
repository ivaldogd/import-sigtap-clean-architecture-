export class SigtapProcedimentoIncremento {
  private readonly _co_procedimento: string;
  private readonly _co_habilitacao: string;
  private readonly _vl_percentual_sh: number;
  private readonly _vl_percentual_sa: number;
  private readonly _vl_percentual_sp: number;
  private readonly _dt_competencia: string;

  constructor(
    co_procedimento: string,
    co_habilitacao: string,
    vl_percentual_sh: number,
    vl_percentual_sa: number,
    vl_percentual_sp: number,
    dt_competencia: string,
  ) {
    if (!co_procedimento) throw new Error('"co_procedimento" é obrigatório');
    if (!co_habilitacao) throw new Error('"co_habilitacao" é obrigatório');
    if (!dt_competencia) throw new Error('"dt_competencia" é obrigatório');
    this._co_procedimento = co_procedimento;
    this._co_habilitacao = co_habilitacao;
    this._vl_percentual_sh = vl_percentual_sh;
    this._vl_percentual_sa = vl_percentual_sa;
    this._vl_percentual_sp = vl_percentual_sp;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento(): string { return this._co_procedimento; }
  get co_habilitacao(): string { return this._co_habilitacao; }
  get vl_percentual_sh(): number { return this._vl_percentual_sh; }
  get vl_percentual_sa(): number { return this._vl_percentual_sa; }
  get vl_percentual_sp(): number { return this._vl_percentual_sp; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_procedimento: this._co_procedimento,
      co_habilitacao: this._co_habilitacao,
      vl_percentual_sh: this._vl_percentual_sh,
      vl_percentual_sa: this._vl_percentual_sa,
      vl_percentual_sp: this._vl_percentual_sp,
      dt_competencia: this._dt_competencia,
    };
  }
}
