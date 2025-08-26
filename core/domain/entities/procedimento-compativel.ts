export class SigtapProcedimentoCompativel {
  private readonly _co_procedimento_principal: string;
  private readonly _co_registro_principal: string;
  private readonly _co_procedimento_compativel: string;
  private readonly _co_registro_compativel: string;
  private readonly _tp_compatibilidade: string;
  private _qt_permitida: number;
  private readonly _dt_competencia: string;

  constructor(
    co_procedimento_principal: string,
    co_registro_principal: string,
    co_procedimento_compativel: string,
    co_registro_compativel: string,
    tp_compatibilidade: string,
    qt_permitida: number,
    dt_competencia: string,
  ) {
    if (!co_procedimento_principal) {
      throw new Error('Campo obrigatório "co_procedimento_principal" não pode ser nulo');
    }
    if (!co_procedimento_compativel) {
      throw new Error('Campo obrigatório "co_procedimento_compativel" não pode ser nulo');
    }
    if (!dt_competencia) {
      throw new Error('Campo obrigatório "dt_competencia" não pode ser nulo');
    }

    this._co_procedimento_principal = co_procedimento_principal;
    this._co_registro_principal = co_registro_principal;
    this._co_procedimento_compativel = co_procedimento_compativel;
    this._co_registro_compativel = co_registro_compativel;
    this._tp_compatibilidade = tp_compatibilidade;
    this._qt_permitida = qt_permitida;
    this._dt_competencia = dt_competencia;
  }

  get co_procedimento_principal(): string {
    return this._co_procedimento_principal;
  }

  get co_registro_principal(): string {
    return this._co_registro_principal;
  }

  get co_procedimento_compativel(): string {
    return this._co_procedimento_compativel;
  }

  get co_registro_compativel(): string {
    return this._co_registro_compativel;
  }

  get tp_compatibilidade(): string {
    return this._tp_compatibilidade;
  }

  get qt_permitida(): number {
    return this._qt_permitida;
  }

  get dt_competencia(): string {
    return this._dt_competencia;
  }

  // --- Regras de domínio ---
  public ehCompatibilidadePrincipal(): boolean {
    return this._tp_compatibilidade?.toUpperCase() === 'P';
  }

  public atualizarQtPermitida(qt: number) {
    if (qt < 0) throw new Error('Quantidade permitida não pode ser negativa');
    this._qt_permitida = qt;
  }

  // --- Fábrica ---
  static fromDTO(dto: {
    co_procedimento_principal: string;
    co_registro_principal: string;
    co_procedimento_compativel: string;
    co_registro_compativel: string;
    tp_compatibilidade: string;
    qt_permitida: number;
    dt_competencia: string;
  }) {
    return new SigtapProcedimentoCompativel(
      dto.co_procedimento_principal,
      dto.co_registro_principal,
      dto.co_procedimento_compativel,
      dto.co_registro_compativel,
      dto.tp_compatibilidade,
      dto.qt_permitida,
      dto.dt_competencia,
    );
  }

  // --- DTO ---
  public paraDTO(): {
    co_procedimento_principal: string;
    co_registro_principal: string;
    co_procedimento_compativel: string;
    co_registro_compativel: string;
    tp_compatibilidade: string;
    qt_permitida: number;
    dt_competencia: string;
  } {
    return {
      co_procedimento_principal: this._co_procedimento_principal,
      co_registro_principal: this._co_registro_principal,
      co_procedimento_compativel: this._co_procedimento_compativel,
      co_registro_compativel: this._co_registro_compativel,
      tp_compatibilidade: this._tp_compatibilidade,
      qt_permitida: this._qt_permitida,
      dt_competencia: this._dt_competencia,
    };
  }
}
