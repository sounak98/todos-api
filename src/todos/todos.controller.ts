import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { TodosService } from './todos.service';

class CreateTodoDto {
  text: string;
}

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  // NOTE: needs to be defined before getTodo
  // otherwise will try to parse 'remaining' as an uuid
  @Get('remaining')
  async getRemainingTodos() {
    return await this.todosService.getRemainingTodos();
  }

  @Get(':id')
  async getTodo(@Param('id') id: string) {
    return await this.todosService.getTodo(id);
  }

  @Get()
  async getAllTodos() {
    return await this.todosService.getAllTodos();
  }

  @Post()
  async createTodo(@Body() createTodoDto: CreateTodoDto) {
    return await this.todosService.createTodo(createTodoDto.text);
  }

  @Post(':id/done')
  async markTodoAsDone(@Param('id') id: string) {
    return await this.todosService.markTodoAsDone(id);
  }
}
