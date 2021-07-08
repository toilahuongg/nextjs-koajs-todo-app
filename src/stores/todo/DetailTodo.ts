import axios from "axios";
import { makeAutoObservable } from "mobx";
import { ITodo } from "src/interface";

class DetailTodo implements ITodo {
    _id: string;
    title: string;
    content: string;
    check: boolean;
    constructor() {
        makeAutoObservable(this, undefined, { autoBind: true });
    }
    async getTodo(id: string) {
        try {
            const response = await axios.get(`/api/todo/${id}`);
            const { title, content, check } = response.data;
            this.title = title;
            this.content = content;
            this.check = check;
        } catch (error) {
            console.log(error);
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