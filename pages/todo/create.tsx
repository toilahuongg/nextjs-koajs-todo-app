import {
  Page,
  Card,
  Form,
  FormLayout,
  TextField,
  Select,
} from "@shopify/polaris";
import React, { ChangeEvent, useState } from "react";
import { observer } from "mobx-react";

import axios from "axios";
import { useRouter } from "next/dist/client/router";

const Home = observer(() => {
  const router = useRouter();
  const [content, setContent] = useState<string>("");
  const [check, setCheck] = useState<string>("false");
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
    const response = await axios.post(
      "http://localhost:3000/api/todo/create",
      data
    );
    console.log(response.data);
    router.push('/');
  };
  return (
    <Page
      breadcrumbs={[{ content: "Todo App", url: "/" }]}
      title="Create Todo"
      primaryAction={{ content: "Add", onAction: handleSubmit }}
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
export default Home;
