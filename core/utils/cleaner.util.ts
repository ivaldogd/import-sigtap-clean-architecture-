
export class DataCleaner {
  /**
   * Limpa e normaliza os dados de um objeto antes de salvar no banco.
   * - Trim strings
   * - Substitui undefined por null
   * - Valida campos obrigatórios
   */
  static clean<T extends object>(
    row: T,
    requiredFields: (keyof T)[] = []
  ): T {
    const cleaned: any = {};

    for (const [key, value] of Object.entries(row)) {
      if (typeof value === 'string') {
        cleaned[key] = value.trim() === '' ? null : value.trim();
      } else if (value === undefined) {
        cleaned[key] = null;
      } else {
        cleaned[key] = value;
      }
    }

    // valida campos obrigatórios
    for (const field of requiredFields) {
      if (cleaned[field] === null || cleaned[field] === undefined) {
        throw new Error(`Campo obrigatório "${String(field)}" não pode ser nulo`);
      }
    }

    return cleaned as T;
  }

  /**
   * Limpa uma lista de objetos
   */
  static cleanAll<T extends object>(
    rows: T[],
    requiredFields: (keyof T)[] = []
  ): T[] {
    return rows.map(r => this.clean(r, requiredFields));
  }
}
