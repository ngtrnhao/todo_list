import './App.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/ToDoList';
import { useState } from 'react';

function App() {
  const [todos,setTodos] = useState ([]);

  const handleAddTodo = (text) =>{
    const newTodo = {
      id:Date.now(),
      text:text,
      completed:false
    };
    setTodos([...todos,newTodo]);
  };

  const handleToggle =(id) =>{
    setTodos(todos.map(todo=>
      todo.id === id ? {...todo,completed: !todo.completed} :todo
    ));
  };

  const handleDelete = (id) =>{
    setTodos(todos.filter(todo => todo.id !== id));
  }
  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm onAdd = {handleAddTodo}/>
      <TodoList 
      todos = {todos}
      onToggle={handleToggle}
      onDelete={handleDelete}
      />
    </div>
  );
}
export default App;