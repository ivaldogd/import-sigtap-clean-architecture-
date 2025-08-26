// src/core/domain/services/change-logger.service.ts
import { ChangeLog } from '../entities/change-log';

export class ChangeLogger {
    static diffObject(before: Record<string, any>, after: Record<string, any>): Record<string, { before: any; after: any }> {
    const diffs: Record<string, { before: any; after: any }> = {};

    for (const key of Object.keys(after)) {
      if (before[key] !== after[key]) {
        diffs[key] = {
          before: before[key],
          after: after[key],
        };
      }
    }

    return diffs;
  }
}
