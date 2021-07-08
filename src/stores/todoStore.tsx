import axios from 'axios';
import { makeAutoObservable } from 'mobx';

import { ITodo } from '../interface';

export default class TodoStore {
    todos:ITodo[] = [];
    loading: boolean = true;
    constructor() {
      makeAutoObservable(this, undefined, { autoBind: true });
    }
    async getData() {
      this.loading  = true;
      const response = await axios.get('http://localhost:3000/api/todo');
      this.todos = response.data;
      this.loading = false;
    }
    
    addTodo(todo: ITodo) {
      this.todos.push(todo);
    }

    removeTodo(id: string) {
      this.todos = this.todos.filter((todo) => todo._id !== id);
    }

    checkTodo(id: string, check: boolean) {
      const idx: number = this.todos.findIndex((todo) => todo._id === id);
      this.todos[idx].check = check;
    }
}
