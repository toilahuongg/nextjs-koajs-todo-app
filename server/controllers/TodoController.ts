import { Context } from "koa";
import TodoModel from "../models/Todo";

const index = async (ctx: Context) => {
  const todos = await TodoModel.find().sort({});
  ctx.body = todos;
};
const create = async (ctx: Context) => {
  const { content, check } = ctx.request.body as any;
  const newTodo = await TodoModel.create({
    content: content || "",
    check: check || false,
  });
  ctx.body = newTodo;
};
const show = async (ctx: Context) => {
  const { id } = ctx.params;
  const todos = await TodoModel.findById({_id: id}).sort({});
  ctx.body = todos;
};
const destroy = async (ctx: Context) => {
  const { id } = ctx.params;
  const todo = await TodoModel.deleteOne({_id: id});
  ctx.body = todo;
};
const update = async (ctx: Context) => {
  const { id } = ctx.params;
  const { content, check } = ctx.request.body as any;
  const todo = await TodoModel.updateOne({_id: id},{
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
