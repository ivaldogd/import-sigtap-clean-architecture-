export interface ExtractedFile {
  name: string;            // nome do arquivo
  openStream: () => NodeJS.ReadableStream; // stream para leitura
}
export interface IZipExtractor {
  extractFiles(buffer: Buffer): Promise<ExtractedFile[]>; // não escreve em disco no core
}