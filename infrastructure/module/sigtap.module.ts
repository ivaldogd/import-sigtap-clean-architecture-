import { Module } from '@nestjs/common';
import { ImportSigtapUseCase } from 'app/core/use-cases/import-sigtap-zip.usecase';
import { SigtapTypeOrmRepository } from '../database/repositories/sigtap-typeorm.repository';
import { ISigtapRepository } from 'app/core/domain/repositories/sigtap-repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SigtapGrupoOrmEntity } from '../database/typeorm-entities/sigtap-grupo.orm-entity';
import { SigtapCidOrm } from '../database/typeorm-entities/sigtap-cid.orm';
import { SigtapSubGrupoOrm } from '../database/typeorm-entities/sigtap-subGroup.orm.entity';
import { SigtapFormaOrganizacaoOrm } from '../database/typeorm-entities/sigtap-SigtapFormaOrganizacaoOrm.entity';
import { SigtapProcedimentoCidOrm } from '../database/typeorm-entities/sigtap-SigtapProcedimentoCidOrm.entity';
import { SigtapProcedimentoCompetenciaOrm } from '../database/typeorm-entities/sigtap-SigtapProcedimentoCompetenciaOrm.entity';
import { SigtapProcedimentoOrm } from '../database/typeorm-entities/sigtap-SigtapProcedimentoOrm.entity';
import { SigtapController } from 'app/application/sigtap/sigtap.controller';
import { SigtapProcedimentoCompativelOrm } from '../database/typeorm-entities/sigtap-SigtapProcedimentoCompativel';
import { ChangeLogOrmEntity } from '../database/typeorm-entities/change-log.orm-entity';



@Module({
 imports: [
    TypeOrmModule.forFeature([
      SigtapGrupoOrmEntity,
      SigtapSubGrupoOrm,
      SigtapFormaOrganizacaoOrm,
      SigtapProcedimentoCidOrm,
      SigtapCidOrm,
      SigtapProcedimentoCompetenciaOrm,
      SigtapProcedimentoOrm,
      SigtapProcedimentoCompativelOrm,
      ChangeLogOrmEntity
    ]),
  ],
  controllers: [SigtapController],
  providers: [
    ImportSigtapUseCase,
    {
      provide: ISigtapRepository,
      useClass: SigtapTypeOrmRepository,
    },
  ],
  exports: [ImportSigtapUseCase],
})
export class SigtapModule {}
