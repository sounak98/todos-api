import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Todo } from './todos.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo) private readonly todosRepository: Repository<Todo>,
  ) {}

  async getTodo(id: string) {
    return await this.todosRepository.findOneByOrFail({
      id,
    });
  }

  async getAllTodos() {
    return await this.todosRepository.find();
  }

  async getRemainingTodos() {
    return await this.todosRepository.findBy({
      isMarkedDone: false,
    });
  }

  async createTodo(text: string) {
    const todo = this.todosRepository.create({
      text,
    });
    return this.todosRepository.save(todo);
  }

  async markTodoAsDone(id: string) {
    const todo = await this.todosRepository.findOneByOrFail({
      id,
    });
    todo.isMarkedDone = true;
    return await this.todosRepository.save(todo);
  }
}
