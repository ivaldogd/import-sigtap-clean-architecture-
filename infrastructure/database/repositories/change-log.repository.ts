// src/infra/database/repositories/change-log.repository.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ChangeLog } from 'app/core/domain/entities/change-log';
import { ChangeLogOrmEntity } from '../typeorm-entities/change-log.orm-entity';


@Injectable()
export class ChangeLogRepository {
  constructor(
    @InjectRepository(ChangeLogOrmEntity)
    private readonly repo: Repository<ChangeLogOrmEntity>,
  ) {}

  async saveLogs(logs: ChangeLog[]): Promise<void> {
    if (!logs.length) return;
    await this.repo.save(
      logs.map((log) => this.repo.create(log)),
    );
  }
}
