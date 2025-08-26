export type FieldDef = { name: string; start: number; end: number; trim?: boolean };
export interface IFixedWidthParser {
  parseLine(line: string, fields: FieldDef[], lineNumber?: number): Record<string, string>;
}