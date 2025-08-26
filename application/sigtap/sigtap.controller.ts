// application/controllers/sigtap.controller.ts
import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImportSigtapUseCase } from 'app/core/use-cases/import-sigtap-zip.usecase';

@Controller('sigtap')
export class SigtapController {
  constructor(private readonly importUseCase: ImportSigtapUseCase) {}

  @Post('import')
  @UseInterceptors(FileInterceptor('file'))
  async import(@UploadedFile() file: Express.Multer.File) {
    return this.importUseCase.execute(file);
  }
}
