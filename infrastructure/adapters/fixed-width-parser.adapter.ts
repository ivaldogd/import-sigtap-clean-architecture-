// src/infrastructure/adapters/fixed-width-parser.adapter.ts
import { IFixedWidthParser, FieldDef } from '../../core/ports/fixed-width-parser.port';

export class FixedWidthParserAdapter implements IFixedWidthParser {
  parseLine(line: string, fields: FieldDef[], lineNumber?: number): Record<string, string> {
    const row: Record<string, string> = {};
    for (const f of fields) {
      const startIdx = f.start - 1;
      const endIdx = f.end;
      const raw = line.length >= endIdx ? line.slice(startIdx, endIdx) : '';
      const value = f.trim ? raw.trim() : raw;

      if (!value && ['co_grupo', 'no_grupo', 'co_procedimento'].includes(f.name)) {
        // logging na borda é ok, mas não polui domínio
        // eslint-disable-next-line no-console
        console.warn(`[SIGTAP][Linha ${lineNumber ?? '?'}] Campo crítico "${f.name}" vazio.`);
      }
      row[f.name] = value || '';
    }
    return row;
  }
}
