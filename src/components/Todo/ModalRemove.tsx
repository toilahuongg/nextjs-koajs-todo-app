import { Modal, TextContainer } from "@shopify/polaris"
import { observer } from "mobx-react";
import React, { useContext } from "react";
import { DetailTodoContext } from "./model";
type TProp = {
    action: () => void
}
const ModalRemove: React.FC<TProp> = observer(({ action }) => {
    const todoStore = useContext(DetailTodoContext);
    const { open, setOpen, loading } = todoStore;
    return (
        <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Delete"
        primaryAction={{
          content: 'Delete',
          destructive: true,
          onAction: action,
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
    )
});
export default ModalRemove;