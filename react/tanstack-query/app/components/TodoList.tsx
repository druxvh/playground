'use client'

import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todos";
import TodoItem from "./TodoItem";


export default function TodoList() {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos
    })
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <ul className="space-y-2">
            {data?.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    );
}