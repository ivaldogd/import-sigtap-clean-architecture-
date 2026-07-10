export class SigtapGrupoHabilitacao {
  private readonly _nu_grupo_habilitacao: string;
  private readonly _no_grupo_habilitacao: string;
  private readonly _ds_grupo_habilitacao: string;

  constructor(
    nu_grupo_habilitacao: string,
    no_grupo_habilitacao: string,
    ds_grupo_habilitacao: string,
  ) {
    if (!nu_grupo_habilitacao) throw new Error('"nu_grupo_habilitacao" é obrigatório');
    this._nu_grupo_habilitacao = nu_grupo_habilitacao;
    this._no_grupo_habilitacao = no_grupo_habilitacao;
    this._ds_grupo_habilitacao = ds_grupo_habilitacao;
  }

  get nu_grupo_habilitacao(): string { return this._nu_grupo_habilitacao; }
  get no_grupo_habilitacao(): string { return this._no_grupo_habilitacao; }
  get ds_grupo_habilitacao(): string { return this._ds_grupo_habilitacao; }

  public paraDTO() {
    return {
      nu_grupo_habilitacao: this._nu_grupo_habilitacao,
      no_grupo_habilitacao: this._no_grupo_habilitacao,
      ds_grupo_habilitacao: this._ds_grupo_habilitacao,
    };
  }
}
