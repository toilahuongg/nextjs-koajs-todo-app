import { observer } from "mobx-react";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Page, Card } from "@shopify/polaris";
import axios from "axios";
import TodoForm from "src/components/Todo/TodoForm";
import { NextPage, NextPageContext } from "next";
import { DetailTodoContext } from "src/components/Todo/model";

type TProps = {
  id: string;
};
const EditTodo: NextPage<TProps> = observer(({ id }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const detailTodoStore = useContext(DetailTodoContext);
  const { title, content, check, loadTodo, getTodo } = detailTodoStore;

  useEffect(() => {
    getTodo(id);
  }, []);
  if (detailTodoStore.loading === true) return <h1> Loading </h1>;
  if (loadTodo === false) return <h1> Not found </h1>;
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      setLoading(true);
      console.log({ content, check });
      const data = {
        title,
        content,
        check: check,
      };
      const response = await axios.put(`/api/todo/${id}`, data);
      console.log(response.data);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Page
      breadcrumbs={[{ content: "Todo App", url: "/" }]}
      title="Edit Todo"
      primaryAction={{ content: "Update", onAction: handleSubmit, loading }}
    >
      <Card sectioned>
        <TodoForm submit={handleSubmit} />
      </Card>
    </Page>
  );
});
EditTodo.getInitialProps = (context: NextPageContext) => {
  const { query } = context;
  const { id } = query;
  return { id: id as string };
};
export default EditTodo;
