import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { DataTable, Checkbox, Button, Spinner, Modal, TextContainer } from "@shopify/polaris";
import { observer } from "mobx-react";
import axios from "axios";
import { ITodo } from "src/interface";
import TodoContext from "src/context/TodoContext";

const TodoList = observer(() => {
  const todoStore = useContext(TodoContext);
  const [ open, setOpen] = useState<boolean>(false);
  const [ deleteId, setDeleteId] = useState<string>("");
  const [ loading, setLoading ] = useState<boolean>(false);
  useEffect(() => {
    todoStore.getData();
  },[])
  const handleRemove = async() => {
    setLoading(true);
    await axios.delete(`/api/todo/${deleteId}`);
    todoStore.removeTodo(deleteId);
    setOpen(false);
    setDeleteId("");
    setLoading(false);
  };
  const handleChangeCheck = async (newChecked: boolean, todo: ITodo) => {
    todoStore.checkTodo(todo._id, newChecked);
    const data = {
      content: todo.content,
      check: newChecked,
    };
    const response = await axios.put(
      `/api/todo/${todo._id}`,
      data
    );
    console.log(response.data);
  };
  const handleClickRemove = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  }
  const rows = todoStore.todos.map((todo) => [
    todo.title,
    todo.content,
    <Checkbox
      label=""
      checked={todo.check}
      onChange={(newChecked) => handleChangeCheck(newChecked, todo)}
    />,
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "3px",
        justifyContent: "flex-end",
      }}
    >
      <Link href={"/todo/"+todo._id}>
        <span><Button size="slim" outline>Edit</Button></span>
      </Link>
      <Button onClick={() => handleClickRemove(todo._id)} destructive size="slim" outline>
        Delete
      </Button>
    </div>,
  ]);
  if(todoStore.loading) return (
    <DataTable
      columnContentTypes={["text", "numeric", "numeric", "numeric"]}
      headings={["Id", "Content", "Check", "Action"]}
      rows={[[<div style={{display: "flex", justifyContent:"center"}}><Spinner accessibilityLabel="Spinner example" size="small" /></div>]]}
      hoverable
    />
  )
  return (
    <>
    <DataTable
      columnContentTypes={["text", "numeric", "numeric", "numeric"]}
      headings={["Title", "Content", "Check", "Action"]}
      rows={rows}
      hoverable
      totals={["", "", "", todoStore.todos.length]}
    />
    <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete"
        primaryAction={{
          content: 'Delete',
          destructive: true,
          onAction: handleRemove,
          loading
        }}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              Bạn có chắc chắn muốn xóa?
            </p>
          </TextContainer>
        </Modal.Section>
      </Modal>
    </>
  );
});
export default TodoList;
