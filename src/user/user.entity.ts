import { CatalogEntity } from 'src/catalog/catalog.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name!: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: new Date().toJSON(),
  })
  created_at: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
    default: new Date().toJSON(),
  })
  updated_at: Date;

  @ManyToMany(() => CatalogEntity, (catalog) => catalog.user, { cascade: true })
  @JoinTable({ name: 'user_catalog' })
  catalog: CatalogEntity[];
}