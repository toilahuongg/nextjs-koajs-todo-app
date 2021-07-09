import { createContext } from "react";
import DetailTodo from "src/stores/todo/DetailTodo";

const detailTodoStore = DetailTodo.create({
    title: "",
    content: "",
    check: false,
    loadTodo: false,
    loading: true
});
const DetailTodoContext = createContext(detailTodoStore);

export default DetailTodoContext;