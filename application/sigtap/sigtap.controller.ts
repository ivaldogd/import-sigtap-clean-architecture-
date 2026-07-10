import { Controller, Post, Get, Param, Query, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { ImportSigtapUseCase } from 'app/core/use-cases/import-sigtap-zip.usecase';
import { GetSigtapAuditUseCase } from 'app/core/use-cases/get-sigtap-audit.usecase';

@Controller('sigtap')
export class SigtapController {
  constructor(
    private readonly importUseCase: ImportSigtapUseCase,
    private readonly auditUseCase: GetSigtapAuditUseCase,
  ) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file: Express.Multer.File) {
    return this.importUseCase.execute(file);
  }

  @Get('audit/:competencia')
  async getAudit(
    @Param('competencia') competencia: string,
    @Query('format') format: 'json' | 'html' | 'html-download' | 'csv',
    @Res() res: Response,
  ) {
    const outputFormat = format || 'json';
    const data = await this.auditUseCase.execute(competencia, outputFormat);

    if (outputFormat === 'html') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(data);
    }

    if (outputFormat === 'html-download') {
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=auditoria-sigtap-${competencia}.html`);
      return res.send(data);
    }

    if (outputFormat === 'csv') {
      res.setHeader('Content-Type', 'text/csv; charset=utf-8');
      res.setHeader('Content-Disposition', `attachment; filename=auditoria-sigtap-${competencia}.csv`);
      return res.send(data);
    }

    return res.json(data);
  }
}
