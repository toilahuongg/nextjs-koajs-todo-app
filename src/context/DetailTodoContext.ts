import { createContext } from "react";
import DetailTodo from "src/stores/todo/DetailTodo";

const detailTodoStore = new DetailTodo();
const DetailTodoContext = createContext(detailTodoStore);

export default DetailTodoContext;