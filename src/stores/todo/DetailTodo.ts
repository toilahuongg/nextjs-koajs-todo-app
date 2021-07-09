import axios from "axios";
import { flow, types } from "mobx-state-tree";

const DetailTodo = types
  .model({
    title: types.string,
    content: types.string,
    check: types.boolean,
    loadTodo: types.boolean,
    loading: types.boolean,
  })
  .actions((self) => ({
    getTodo: flow(function* (id: string) {
      try {
        this.loading = true;
        const response = yield axios.get(`/api/todo/${id}`);
        const { title, content, check } = response.data;
        this.title = title;
        this.content = content;
        this.check = check;
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = true;
        this.loadTodo = false;
      }
    }),
    setTitle(newTitle: string) {
        self.title = newTitle;
    },
    setContent(newContent: string) {
        self.content = newContent;
    },
    toggleCheck(check: boolean) {
        self.check = check;
    }
  }));
export default DetailTodo;