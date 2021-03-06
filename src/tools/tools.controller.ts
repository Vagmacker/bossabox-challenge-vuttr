import { Tool } from './tool.entity';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { ToolsService } from './tools.service';
import { ToolTO } from './to/tool.to';

/**
 * Classe de controle das requisições referente as Ferramentas.
 */
@ApiTags('Tools')
@Controller('tools')
export class ToolsController {
  /**
   * Construtor da classe
   *
   * @param toolService
   */
  constructor(private readonly toolService: ToolsService) {}

  /**
   * Retorna a lista de ferramentas encontradas na base de dados.
   */
  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOperation({ summary: 'Recupera a lista de ferramentas' })
  public async index(@Query('tag') query: string): Promise<ToolTO[]> {
    const toolsTO: ToolTO[] = [];
    const tools: Tool[] = await this.toolService.findAll(query);

    tools.forEach(tool => {
      toolsTO.push(Object.assign(tool))

      toolsTO.forEach((toolTO: ToolTO, index: number) => {
        toolTO.tags = tool.tags.split(',')
      })
    })

    return toolsTO;
  }

  /**
   * Retorna a ferramenta encontrada na base de dados.
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Recupera uma ferramenta' })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async show(@Param('id') id: string): Promise<ToolTO> {
    let tooTO: ToolTO = new ToolTO();
    const tool: Tool = await this.toolService.findOne(id);

    tooTO = Object.assign(tool, tooTO);

    tooTO.tags = tool.tags.split(',');

    return tooTO;
  }

  /**
   * Salva uma ferramenta na base de dados.
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ status: 201, description: 'Created' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiOperation({
    summary: 'Salva as informações da ferramenta conforme os critérios especificados na aplicação.'
  })
  public async save(@Body() toolTO: ToolTO): Promise<Tool> {
    let tool: Tool = new Tool();
    tool = Object.assign(toolTO, tool);
    tool.tags = toolTO.tags.toString();

    return await this.toolService.save(tool);
  }

  /**
   * Exclui uma ferramenta da base de dados.
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove uma ferramenta' })
  @ApiResponse({ status: 204, description: 'No Content' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  public async destroy(@Param('id') id: string): Promise<void> {
    await this.toolService.remove(id);
  }
}
