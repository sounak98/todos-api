import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getConnectionOptions } from 'typeorm';

import { AppController } from './app.controller';
import { TodosModule } from './todos/todos.module';

/**
 * TODO:
 *  - add delete route
 *  - add support for migration using typeorm cli, disable synchronize
 *  - add custom error handling
 *  - add ConfigService, get rid of getConnectionOptions & ormconfig
 *  - add user module with basic authentication
 */

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        ...(await getConnectionOptions()),
        autoLoadEntities: true,
      }),
    }),
    TodosModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
