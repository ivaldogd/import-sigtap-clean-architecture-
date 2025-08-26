/**
 * Remove acentos de uma string
 */
function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/**
 * Converte uma string para snake_case
 */
function toSnakeCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, "$1_$2") // camelCase → camel_Case
    .replace(/[\s\-]+/g, "_")           // espaços e hífens → _
    .toLowerCase();
}

/**
 * Normaliza as chaves de um objeto:
 * - remove acentos
 * - aplica snake_case
 */
export class KeyNormalizer {
  static normalizeKeys<T extends Record<string, any>>(obj: T): Record<string, any> {
    const newObj: Record<string, any> = {};

    Object.keys(obj).forEach((key) => {
      const noAccent = removeAccents(key);
      const normalized = toSnakeCase(noAccent);
      newObj[normalized] = obj[key];
    });

    return newObj;
  }

  static normalizeArray<T extends Record<string, any>>(arr: T[]): Record<string, any>[] {
    return arr.map((item) => this.normalizeKeys(item));
  }
}
