import { Container } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import TodoListComponent from "./components/TodoList/TodoListComponent";
import TodoComponent from "./components/TodoMainComponent/TodoMainComponent";
import { ITodo } from "./interfaces/interfaces";
import { theme } from "./setup/theme";

const App: React.FC = () => {
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  useEffect(() => {
    const saved = JSON.parse(
      localStorage.getItem("todoList") || "[]"
    ) as ITodo[];
    setTodoList(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const addHandler = (todo: string) => {
    const newTodo: ITodo = {
      title: todo,
      id: Date.now(),
      completed: false,
    };
    setTodoList((prev) => [newTodo, ...prev]);
  };

  const toggleHandler = (id: number) => {
    setTodoList((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      })
    );
  };
  const removeHandler = (id: number) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <TodoComponent onAdd={addHandler} />
        <TodoListComponent
          todoList={todoList}
          onToggle={toggleHandler}
          onRemove={removeHandler}
        />
      </Container>
    </ThemeProvider>
  );
};

export default App;
