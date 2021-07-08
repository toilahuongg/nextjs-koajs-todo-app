import { createContext } from "react";
import TodoStore from "../stores/todo/TodoStore";

const todoStore = new TodoStore();
const TodoContext = createContext(todoStore);
export default TodoContext;