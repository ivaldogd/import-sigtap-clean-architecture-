
export class ChangeLog {
  constructor(
    public readonly id: string,
    public readonly entity: string,        // exemplo: 'SigtapProcedimentoCompativel'
    public readonly entityId: string,      // co_procedimento_principal ou chave composta
    public readonly field: string,         // campo alterado
    public readonly oldValue: string | null,
    public readonly newValue: string | null,
    public readonly changedAt: Date,
    public readonly changedBy?: string,    // usuário, processo, etc.
  ) {}
}
