import TodoItem from "../models/TodoItem";

const useMockDb = () => {
    const getTodoItems = async () : Promise<TodoItem[]> => {
        return await fetch('http://localhost:8000/todos')
            .then(res => res.json())
            .then(data => {
                let items : TodoItem[] = [];
                data.forEach((item : TodoItem) => { 
                    items.push({ ...item, modifiedDate: new Date(item.modifiedDate) });
                });
                return items;
            });
    }

    const addNewTodoItem = async (item : TodoItem) : Promise<void> => {
        await fetch(`http://localhost:8000/todos`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(item),
        });
    }

    const updateTodoItem = async (item : TodoItem) : Promise<void> => {
        await fetch(`http://localhost:8000/todos/${item.id}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(item),
        });
    }

    const deleteTodoItem = async (item : TodoItem) : Promise<void> => {
        await fetch(`http://localhost:8000/todos/${item.id}`, {
            method: 'DELETE',
        });
    }

    return { getTodoItems, addNewTodoItem, updateTodoItem, deleteTodoItem };
}

export default useMockDb;