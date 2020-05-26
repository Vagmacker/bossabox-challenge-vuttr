import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ToolsModule } from './tools/tools.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tool } from './tools/tool.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'bossabox',
      entities: [Tool],
      synchronize: true,
    }),
    ToolsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
