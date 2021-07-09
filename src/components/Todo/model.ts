import { types } from "mobx-state-tree";
import { createContext } from "react";
const DetailTodoStore = types.model({
    loading: types.boolean,
    open: types.boolean,
    id: types.string
}).actions(self => ({
    setId(value: string) {
        self.id = value;
    },
    setOpen(value: boolean) {
        self.open = value;
    },
    setLoading(value: boolean) {
        self.loading = value;
    }
}))
export const detailTodoStore = DetailTodoStore.create({loading: false, open: false, id: ""});
export const DetailTodoContext = createContext(detailTodoStore);
export default DetailTodoStore;