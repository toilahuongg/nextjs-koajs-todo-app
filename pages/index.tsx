import { Page, Card } from "@shopify/polaris";
import React from "react";
import { observer } from "mobx-react";

import TodoList from "../src/components/Todo/TodoList";

const Home = observer(() => {
  return (
    <Page title="Todo App" primaryAction={{ content: "Add Todo", url: "/todo/create" }}>
      <Card>
        <TodoList />
      </Card>
    </Page>
  );
});
export default Home;
