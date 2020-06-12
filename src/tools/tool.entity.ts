import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tools'})
export class Tool {

  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column()
  @ApiProperty()
  link: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  tags: string;

  @Column({ name: 'created_at' })
  createdAt: Date
}
