"use server"

export type Todo = {
    id: string
    text: string
    completed: boolean
}

let todos: Todo[] = [
    { id: '1', text: 'Learn React Query', completed: false },
    { id: '2', text: 'Build a Todo app', completed: false },
]

export const getTodos = async (): Promise<Todo[]> => {
    return todos
}

export const addTodo = async (text: string): Promise<Todo> => {
    const newTodo = {
        id: Date.now().toString(),
        text,
        completed: false,
    }
    todos.push(newTodo)
    return newTodo
}

export const toggleTodo = async (id: string): Promise<Todo> => {
    const todo = todos.find(t => t.id === id)
    if (!todo) throw new Error('Todo not found')
    todo.completed = !todo.completed
    return todo
}

export const deleteTodo = async (id: string): Promise<void> => {
    todos = todos.filter(t => t.id !== id)
}