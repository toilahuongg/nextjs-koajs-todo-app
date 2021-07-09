import axios from "axios";
import { types, Instance, cast, flow } from "mobx-state-tree";

const Todo = types.model({
  _id: types.string,
  title: types.string,
  content: types.string,
  check: types.boolean,
});
export interface ITodo extends Instance<typeof Todo> {}

const TodoStore = types
  .model({
    todos: types.array(Todo),
    loading: types.boolean,
  })
  .actions((self) => ({
    getData: flow(function * () {
      self.loading = true;
      const response = yield axios.get(`/api/todo`);
      self.todos = response.data;
      self.loading = false;
    }),
    addTodo(todo: ITodo) {
      self.todos = cast([todo, ...self.todos]);
    },
    removeTodo(id: string) {
      self.todos = cast(self.todos.filter((todo) => todo._id !== id));
    },
    checkTodo(id: string, check: boolean) {
      const idx: number = self.todos.findIndex((todo) => todo._id === id);
      self.todos[idx].check = check;
    },
  }));
export default TodoStore;
