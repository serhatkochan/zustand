import React, {useState} from 'react';
import {useTodosStore} from "./store/zustand/todos";

const AddTodo = () => {
    const [title, setTitle] = useState('');
    const [completed, setCompleted] = useState(false);

    const addTodo = useTodosStore((state) => state.addTodo);

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo({title, completed})
        setTitle('');
        setCompleted(false);
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Todo"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <br/>
            <label>
                <input
                    type="checkbox"
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                />
                {completed ? 'Tamamlandi' : 'Bekiyor'}
            </label>
            <br/>
            <button type="submit">Ekle</button>
        </form>
    );
};

export default AddTodo;