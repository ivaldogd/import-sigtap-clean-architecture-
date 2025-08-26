export class SigtapCid {

   private readonly _co_cid: string;
    private readonly _no_cid: string;
    private readonly _tp_agravo: string;
    private readonly _tp_sexo: string;
    private readonly _tp_estadio: string;
    private readonly _vl_campos_irradiados: number;
  private constructor(
    co_cid: string,
    no_cid: string,
    tp_agravo: string,
    tp_sexo: string,
    tp_estadio: string,
    vl_campos_irradiados: number
  ) {
    this._co_cid = co_cid;
    this._no_cid = no_cid;
    this._tp_agravo = tp_agravo;
    this._tp_sexo = tp_sexo;
    this._tp_estadio = tp_estadio;
    this._vl_campos_irradiados = vl_campos_irradiados;
    this.validate();
  }

  static create(props: {
    co_cid: string;
    no_cid: string;
    tp_agravo: string;
    tp_sexo: string;
    tp_estadio: string;
    vl_campos_irradiados: number;
  }): SigtapCid {
    return new SigtapCid(
      props.co_cid,
      props.no_cid,
      props.tp_agravo,
      props.tp_sexo,
      props.tp_estadio,
      props.vl_campos_irradiados,
    );
  }

  private validate(): void {
    if (!this._co_cid) throw new Error('co_cid é obrigatório.');
    if (this._tp_sexo && !['M', 'F', 'I'].includes(this._tp_sexo)) {
      throw new Error('tp_sexo inválido (esperado M, F ou I).');
    }
    if (this._vl_campos_irradiados < 0) {
      throw new Error('vl_campos_irradiados não pode ser negativo.');
    }
  }

  get co_cid(): string {
    return this.co_cid;
  }
  get no_cid(): string {
    return this._no_cid;
  }
  get tp_agravo(): string {
    return this._tp_agravo;
  }
  get tp_sexo(): string {
    return this._tp_sexo;
  }
  get tp_estadio(): string {
    return this._tp_estadio;
  }
  get vl_campos_irradiados(): number {
    return this._vl_campos_irradiados;
  }

  static fromDTO(dto: {
    co_cid: string;
    no_cid: string;
    tp_agravo: string;
    tp_sexo: string;
    tp_estadio: string;
    vl_campos_irradiados: number;
  }): SigtapCid {
    return new SigtapCid(
      dto.co_cid,
      dto.no_cid,
      dto.tp_agravo,
      dto.tp_sexo,
      dto.tp_estadio,
      dto.vl_campos_irradiados,
    );
  }

  public paraDTO(): {
    co_cid: string;
    no_cid: string;
    tp_agravo: string;
    tp_sexo: string;
    tp_estadio: string;
    vl_campos_irradiados: number;
  } {
    return {
      co_cid: this._co_cid,
      no_cid: this._no_cid,
      tp_agravo: this._tp_agravo,
      tp_sexo: this._tp_sexo,
      tp_estadio: this._tp_estadio,
      vl_campos_irradiados: this._vl_campos_irradiados,
    };
  }

  // === comportamentos ===
  isMasculino(): boolean {
    return this._tp_sexo === 'M';
  }
  isFeminino(): boolean {
    return this._tp_sexo === 'F';
  }
  requiresRadiotherapy(): boolean {
    return this._vl_campos_irradiados > 0;
  }
  describe(): string {
    return `${this._co_cid} - ${this._no_cid} (${this._tp_sexo || 'indefinido'})`;
  }
}
