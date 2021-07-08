import { model, Schema } from "mongoose";
export interface ITodo {
  content: string;
  check: string;
}
const todo = new Schema<ITodo>(
  {
    content: { type: String, required: true },
    check: { type: Boolean, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const TodoModel = model<ITodo>("todo", todo);
export default TodoModel;
