export class SigtapProcedimentoCid {
  private readonly _co_procedimento: string;
  private readonly _co_cid: string;
  private readonly _st_principal: string;
  private readonly _dt_competencia: string;
  constructor(
     co_procedimento: string,
     co_cid: string,
     dt_competencia: string,
     st_principal?: string
  ) {
    if (!co_procedimento) throw new Error('Campo obrigatório "co_procedimento" não pode ser nulo');
    if (!co_cid) throw new Error('Campo obrigatório "co_cid" não pode ser nulo');
    if (!dt_competencia) throw new Error('Campo obrigatório "dt_competencia" não pode ser nulo');

  
    this._co_procedimento = co_procedimento;
    this._co_cid = co_cid;
    this._dt_competencia = dt_competencia;
    this._st_principal = st_principal || 'N';
  }

  get co_procedimento(): string {
    return this._co_procedimento;
  }
  get co_cid(): string {
    return this._co_cid;
  }
  get dt_competencia(): string {
    return this._dt_competencia;
  }

   get st_principal(): string {
    return this._st_principal;
  }

  static fromDTO(dto: { co_procedimento: string; co_cid: string; dt_competencia: string, st_principal: string }): SigtapProcedimentoCid {
    return new SigtapProcedimentoCid(dto.co_procedimento, dto.co_cid, dto.dt_competencia, dto.st_principal);
  }

  public paraDTO(): { co_procedimento: string; co_cid: string; dt_competencia: string, st_principal: string } {
    return {
      co_procedimento: this._co_procedimento,
      co_cid: this._co_cid,
      dt_competencia: this._dt_competencia,
      st_principal: this._st_principal
    };
  }
}