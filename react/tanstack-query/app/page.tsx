
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

export default function Home() {

  return (
    <main className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold mb-4">React Query Todo App</h1>
      <AddTodo />
      <TodoList />
    </main>
  )
}
