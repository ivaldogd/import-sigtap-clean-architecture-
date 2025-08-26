// infrastructure/database/entities/change-log.orm-entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity({ name: 'change_log' })
export class ChangeLogOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'entity', type: 'varchar', length: 100 })
  entity: string;

  @Column({ name: 'record_id', type: 'varchar', length: 255 })
  record_id: string;

  @Column({ name: 'field', type: 'varchar', length: 100 })
  field: string;

  @Column({ name: 'old_value', type: 'text', nullable: true })
  old_value: string | null;

  @Column({ name: 'new_value', type: 'text', nullable: true })
  new_value: string | null;

  @Column({ name: 'updated_by', type: 'varchar', length: 50 })
  updated_by: string;

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;

  constructor(data?: {
    entity: string;
    record_id: string;
    field: string;
    old_value?: string | null;
    new_value?: string | null;
    updated_by: string;
    updated_at?: Date;
  }) {
    if (data) {
      this.entity = data.entity;
      this.record_id = data.record_id;
      this.field = data.field;
      this.old_value = data.old_value ?? null;
      this.new_value = data.new_value ?? null;
      this.updated_by = data.updated_by;
      this.updated_at = data.updated_at ?? new Date();
    }
  }
}
