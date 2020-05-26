import { isEmpty } from './../utils/util';
import { Tool } from './tool.entity';
import { Repository, Connection, QueryRunner } from 'typeorm';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

/**
 * Classe de negócio referente a ferramenta.
 */
@Injectable()
export class ToolsService {
  /**
   * @var dbConnection
   */
  public dbConnection: QueryRunner;

  /**
   * Construtor da classe.
   *
   * @param connection
   * @param toolsRepository
   */
  constructor(
    private readonly connection: Connection,
    @InjectRepository(Tool) private toolsRepository: Repository<Tool>
  ) {
    this.dbConnection = this.connection.createQueryRunner();
  }

  /**
   * Retorna todas as ferramentas da base de dados
   */
  async findAll(tag?: string): Promise<Tool[]> {
    const tools: Tool[] = await this.toolsRepository.find({ where: { tag } });
    return tools;
  }

  /**
   * Retorna uma ferramenta pelo 'id' informado.
   *
   * @param id
   */
  async findOne(id: string): Promise<Tool> {
    const tool: Tool = await this.toolsRepository.findOne(id);

    if (isEmpty(tool)) {
      throw new NotFoundException('Nenhum registro encontrado.');
    }

    return tool;
  }

  /**
   * Salva uma ferramenta.
   *
   * @param tool
   */
  async save(tool: Tool): Promise<Tool> {
    let newTool: Tool;
    await this.dbConnection.connect();
    await this.dbConnection.startTransaction();

    try {
      newTool = await this.toolsRepository.save(tool);

      await this.dbConnection.commitTransaction();
    } catch {
      await this.dbConnection.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await this.dbConnection.release();
    }

    return newTool;
  }

  /**
   * Remove uma ferramenta pelo 'id' informado.
   *
   * @param id
   */
  async remove(id: string): Promise<void> {
    const tool: Tool = await this.findOne(id);

    await this.dbConnection.connect();
    await this.dbConnection.startTransaction();

    try {
      await this.toolsRepository.delete(tool.id);
    } catch {
      await this.dbConnection.rollbackTransaction();
      throw new BadRequestException();
    } finally {
      await this.dbConnection.release();
    }
  }
}
