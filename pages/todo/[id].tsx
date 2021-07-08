import { observer } from "mobx-react";
import { useRouter } from "next/dist/client/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Page,
  FormLayout,
  TextField,
  Card,
  Form,
  Select,
} from "@shopify/polaris";
import useStores from "src/hook/use-stores";
import axios from "axios";

const EditTodo = observer(() => {
  const router = useRouter();
  const { id } = router.query;
  const { todoStore } = useStores();

  useEffect(() => {
    todoStore.getData();
  }, []);

  const todo = todoStore.todos.find((todo) => todo._id === id);
  if (todo === undefined) return <h1>Not Found</h1>;
  const [content, setContent] = useState<string>(todo.content);
  const [check, setCheck] = useState<string>(todo.check ? "true" : "false");

  const options = [
    { label: "Chưa làm", value: "false" },
    { label: "Đã làm", value: "true" },
  ];

  const handleSelectChange = (value: string) => {
    setCheck(value);
  };
  const handeChangeContent = (value: string) => {
    setContent(value);
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log({ content, check });
    const data = {
      content,
      check: check === "false" ? false : true,
    };
    const response = await axios.put(
      `http://localhost:3000/api/todo/${id}`,
      data
    );
    console.log(response.data);
    router.push('/')

  };
  return (
    <Page
      breadcrumbs={[{ content: "Todo App", url: "/" }]}
      title="Edit Todo"
      primaryAction={{ content: "Update", onAction: handleSubmit }}
    >
      <Card>
        <Form onSubmit={handleSubmit}>
          <FormLayout>
            <TextField
              label=""
              value={content}
              onChange={handeChangeContent}
              placeholder="Content..."
              connectedRight={
                <Select
                  label=""
                  options={options}
                  onChange={handleSelectChange}
                  value={check}
                />
              }
            />
          </FormLayout>
        </Form>
      </Card>
    </Page>
  );
});
export default EditTodo;
