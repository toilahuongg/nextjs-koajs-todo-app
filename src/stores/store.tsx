import { createContext } from "react";
import TodoStore from "./todoStore";

const storesContext = createContext({
    todoStore: new TodoStore()
});
export default storesContext;