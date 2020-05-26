import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
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
}
