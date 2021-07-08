import axios from "axios";
import { makeAutoObservable } from "mobx";
import { ITodo } from "src/interface";

class DetailTodo implements ITodo {
    _id: string;
    title: string;
    content: string;
    check: boolean;
    loadTodo: boolean = false;
    loading: boolean = true;
    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true });
    }
    async getTodo(id: string) {
        try {
            this.loading  = true;
            const response = await axios.get(`/api/todo/${id}`);
            const { title, content, check } = response.data;
            this.title = title;
            this.content = content;
            this.check = check;
            this.loading  = false;
            this.loadTodo = true;
        } catch (error) {
            console.log(error);
            this.loading  = true;
            this.loadTodo = false;
        }
        
    }
    setTitle(newTitle: string) {
        this.title = newTitle;
    }
    setContent(newContent: string) {
        this.content = newContent;
    }
    toggleCheck(check: boolean) {
        this.check = check;
    }
}
export default DetailTodo;