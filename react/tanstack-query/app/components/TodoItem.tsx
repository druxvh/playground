'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteTodo, Todo, toggleTodo } from "../api/todos"

export default function TodoItem({ todo }: { todo: Todo }) {
    const queryClient = useQueryClient()

    const toggleMutation = useMutation({
        mutationFn: () => toggleTodo(todo.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })
    const deleteMutation = useMutation({
        mutationFn: () => deleteTodo(todo.id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        }
    })

    return (
        <li className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleMutation.mutate()}
                    className="h-4 w-4"
                />
                <span className={todo.completed ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                </span>
            </div>
            <button
                onClick={() => deleteMutation.mutate()}
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
        </li>
    )
}
