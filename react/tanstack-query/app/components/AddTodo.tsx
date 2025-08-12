'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import React, { useState } from "react"
import { addTodo } from "../api/todos"

export default function AddTodo() {
    const [text, setText] = useState('')
    const queryClient = useQueryClient()

    const addMutation = useMutation({
        mutationFn: () => addTodo(text),
        onSuccess: () => {
            setText('')
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        }
    })
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!text.trim()) return
        addMutation.mutate()
    }

    return (
        <form onSubmit={handleSubmit} className="flex space-x-2 mb-4">
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                className="flex-1 p-2 border rounded"
                placeholder="Add a new todo..."
            />
            <button
                type="submit"
                disabled={addMutation.isPending}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
                {addMutation.isPending ? 'Adding...' : 'Add'}
            </button>
        </form>
    )
}
