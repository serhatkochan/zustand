import {create} from "zustand";
import omit from "lodash-es/omit";
import {shallow} from "zustand/shallow";
import {subscribeWithSelector} from "zustand/middleware";

export const useTodosStore = create((set, get) => ({
    todos: [],
    users: [],
    addTodo: (item) => set((state) => ({
        todos: [...state.todos, item],
    })),
    removeTodo: (id) => set((state) => ({
        todos: state.todos.filter((_, key) => id !== key),
    })),
    deleteEverything: () => set({}, true), // clears the entire store, actions included
    deleteTodos: () => set((state) => omit(state, ['todos']), true),
    fetchTodos: async () => {
        const result = await fetch('https://jsonplaceholder.typicode.com/todos')
        set({ todos: await result.json()})
        // get().deleteEverything()
    },
}))

// subscribe(selector, callback, options?: {equalityFn, fireImmediately}): Unsubsribe
const sub1 = useTodosStore.subscribe(console.log);
const sub2 = useTodosStore.subscribe((state) => state.todos, console.log);
const sub3 = useTodosStore.subscribe(
    (state) => state.todos,
    (todos, previousTodos) => console.log(todos, previousTodos)
);
const sub4 = useTodosStore.subscribe(
    (state) => [state.todos, state.users],
    console.log,
    {equalityFn: shallow}
);
const sub5 = useTodosStore.subscribe((state) => state.todos, console.log, {
    fireImmediately: true,
})