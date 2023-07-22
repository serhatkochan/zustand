import {useTodosStore} from "store/zustand/todos";
import AddTodo from "./AddTodo";
import {shallow} from "zustand/shallow";
import {useEffect} from "react";

function App() {
    // const todos = useTodosStore((state) => state.todos);
    // const removeTodo = useTodosStore((state) => state.removeTodo); // memeroize

    const {todos, removeTodo, fetchTodos, deleteEverything} = useTodosStore((state) => ({
        todos: state.todos,
        removeTodo: state.removeTodo,
        fetchTodos: state.fetchTodos,
        deleteEverything: state.deleteEverything
    }), shallow) // memorize

    useEffect(() => {
        // fetchTodos();
    }, [])

    console.log(todos);

    return (
        <>
            {todos?.length === 0 && (<div>Liste boş</div>)}
            {todos?.map((todo, key) => (
                <div key={key}>
                    {todo.title} <br/>
                    {todo.completed ? 'Tamamlandı' : 'Bekliyor'}
                    <button onClick={() => removeTodo(key)}>Sil</button>
                </div>
            ))}
            <button onClick={() => deleteEverything()}>deleteEverything</button>

            <AddTodo/>
        </>
    );
}

export default App;
