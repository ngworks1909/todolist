import { createContext, useState } from "react";

export const TodoContext = createContext();

export const TodoContextProvider = ({ children }) => {
  const todoInitial = [];
  const [todos, setTodos] = useState(todoInitial);

  const addTodo = async (title) => {
    const response = await fetch(`https://todobackend-five.vercel.app/api/todo/createTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ title }),
    });

    const { success, savedTodo } = await response.json();
    if (success) {
      setTodos(todos.concat(savedTodo));
    }
  };

  const getTodos = async () => {
    const response = await fetch(`https://todobackend-five.vercel.app/api/todo/fetchAllTodos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });

    const { success, todoItems } = await response.json();
    if (success) {
      setTodos(todoItems);
    }
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`https://todobackend-five.vercel.app/api/todo/deleteTodo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    const { success } = json;
    if (success) {
      const { message } = json;
      const newTodos = todos.filter((todo) => {
        return todo._id !== id;
      });
      setTodos(newTodos);
      return message;
    } else {
      const { error } = json;
      return error;
    }
  };

  const updateTodo = async(id, title) =>{
    const response = await fetch(`https://todobackend-five.vercel.app/api/todo/updateTodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({title}),
    });
    const {success} = await response.json();
    if(success){
      const newTodos = JSON.parse(JSON.stringify(todos));

      for(let index = 0; index < newTodos.length; index++){
        const element = newTodos[index];
        if(element._id===id){
          newTodos[index].title = title;
          break;
        }
      }
      setTodos(newTodos);
    }
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, getTodos, deleteTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
