export class SigtapServicoClassificacao {
  private readonly _co_servico: string;
  private readonly _co_classificacao: string;
  private readonly _no_classificacao: string;
  private readonly _dt_competencia: string;

  constructor(
    co_servico: string,
    co_classificacao: string,
    no_classificacao: string,
    dt_competencia: string,
  ) {
    if (!co_servico) throw new Error('"co_servico" é obrigatório');
    if (!co_classificacao) throw new Error('"co_classificacao" é obrigatório');
    this._co_servico = co_servico;
    this._co_classificacao = co_classificacao;
    this._no_classificacao = no_classificacao;
    this._dt_competencia = dt_competencia;
  }

  get co_servico(): string { return this._co_servico; }
  get co_classificacao(): string { return this._co_classificacao; }
  get no_classificacao(): string { return this._no_classificacao; }
  get dt_competencia(): string { return this._dt_competencia; }

  public paraDTO() {
    return {
      co_servico: this._co_servico,
      co_classificacao: this._co_classificacao,
      no_classificacao: this._no_classificacao,
      dt_competencia: this._dt_competencia,
    };
  }
}
