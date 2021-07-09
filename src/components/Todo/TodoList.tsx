import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { DataTable, Checkbox, Button, Spinner } from "@shopify/polaris";
import { observer } from "mobx-react";
import axios from "axios";
import { ITodo } from "src/interface";
import TodoContext from "src/context/TodoContext";
import style from "./style.module.scss";
import { DetailTodoContext } from "./model";
import ModalRemove from "./ModalRemove";
const TodoList = observer(() => {
  const todoStore = useContext(TodoContext);
  const detailTodoStore = useContext(DetailTodoContext);
  const { id, setLoading, setOpen, setId } = detailTodoStore;
  // const [ deleteId, setDeleteId] = useState<string>("");
  // const [ loading, setLoading ] = useState<boolean>(false);
  const [loadTodos, setLoadTodos] = useState<boolean[]>([]);
  useEffect(() => {
    todoStore.getData();
  }, []);
  const handleRemove = async() => {
    setLoading(true);
    console.log(id);
    // await axios.delete(`/api/todo/${deleteId}`);
    // todoStore.removeTodo(deleteId);
    setOpen(false);
    setId("");
    setLoading(false);
  };
  const handleChangeCheck = async (newChecked: boolean, todo: ITodo) => {
    todoStore.checkTodo(todo._id, newChecked);
    const data = {
      content: todo.content,
      check: newChecked,
    };
    const response = await axios.put(`/api/todo/${todo._id}`, data);
    console.log(response.data);
  };
  const handleClickRemove = (id: string) => {
    setId(id);
    setOpen(true);
  };
  const handleClickClone = async (todo: ITodo) => {
    let arrLoading = [...loadTodos];
    arrLoading[todo._id] = true;
    setLoadTodos(arrLoading);
    const data = {
      title: todo.title,
      content: todo.content,
      check: todo.check,
    };
    const response = await axios.post("/api/todo/create", data);
    console.log(response.data);
    arrLoading[todo._id] = false;
    setLoadTodos(arrLoading);
    const newTodo: ITodo = {
      _id: response.data._id,
      title: response.data.title,
      content: response.data.content,
      check: response.data.check,
    };
    todoStore.addTodo(newTodo);
  };
  const rows = todoStore.todos.map((todo) => [
    todo.title,
    todo.content,
    <Checkbox
      label=""
      checked={todo.check}
      onChange={(newChecked) => handleChangeCheck(newChecked, todo)}
    />,
    <div className={style.buttonGroup}>
      <Button
        onClick={() => {
          handleClickClone(todo);
        }}
        size="slim"
        loading={loadTodos[todo._id]}
      >
        Clone
      </Button>
      <Link href={"/todo/" + todo._id}>
        <span>
          <Button size="slim" outline>
            Edit
          </Button>
        </span>
      </Link>
      <Button
        onClick={() => handleClickRemove(todo._id)}
        destructive
        size="slim"
        outline
      >
        Delete
      </Button>
    </div>,
  ]);
  if (todoStore.loading)
    return (
      <DataTable
        columnContentTypes={["text", "numeric", "numeric", "numeric"]}
        headings={["Id", "Content", "Check", "Action"]}
        rows={[
          [
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Spinner accessibilityLabel="Spinner example" size="small" />
            </div>,
          ],
        ]}
        hoverable
      />
    );
  return (
    <>
      <DataTable
        columnContentTypes={["text", "numeric", "numeric", "numeric"]}
        headings={["Title", "Content", "Check", "Action"]}
        rows={rows}
        hoverable
        totals={["", "", "", todoStore.todos.length]}
      />
      <ModalRemove action={handleRemove}/>
    </>
  );
});
export default TodoList;
