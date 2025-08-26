// src/infrastructure/adapters/zip-extractor.adapter.ts
import { IZipExtractor, ExtractedFile } from '../../core/ports/zip-extractor.port';
import AdmZip from 'adm-zip';
export class ZipExtractorAdapter implements IZipExtractor {
  async extractFiles(buffer: Buffer): Promise<ExtractedFile[]> {
    const zip = new AdmZip(buffer);
    const entries = zip.getEntries();
    return entries
      .filter(e => !e.isDirectory)
      .map<ExtractedFile>(e => ({
        name: e.entryName,
        openStream: () => {
          const { Readable } = require('stream');
          return Readable.from(zip.readFile(e)); // stream a partir do buffer do entry
        },
      }));
  }
}
