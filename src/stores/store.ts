import { createContext } from "react";
import TodoStore from "./todo/TodoStore";

const storesContext = createContext({
    todoStore: new TodoStore()
});
export default storesContext;