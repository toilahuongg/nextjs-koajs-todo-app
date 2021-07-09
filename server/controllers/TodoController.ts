import { Context } from "koa";
import TodoModel from "../models/Todo";

const index = async (ctx: Context) => {
  const todos = await TodoModel.find().sort({"created_at": -1}).lean();
  ctx.body = todos;
};
const create = async (ctx: Context) => {
  const { title, content, check } = ctx.request.body as any;
  const newTodo = await TodoModel.create({
    title: title || "",
    content: content || "",
    check: check || false,
  });
  ctx.body = newTodo;
};
const show = async (ctx: Context) => {
  const { id } = ctx.params;
  const todos = await TodoModel.findById({_id: id}).lean();
  ctx.body = todos;
};
const destroy = async (ctx: Context) => {
  const { id } = ctx.params;
  const todo = await TodoModel.deleteOne({_id: id});
  ctx.body = todo;
};
const update = async (ctx: Context) => {
  const { id } = ctx.params;
  const { title, content, check } = ctx.request.body as any;
  const todo = await TodoModel.updateOne({_id: id},{
    title: title || "",
    content: content || "",
    check: check || false,
  });
  ctx.body = todo;
};
const TodoController = {
  index,
  show,
  create,
  destroy,
  update
};
export default TodoController;
