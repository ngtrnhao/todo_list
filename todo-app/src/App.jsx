import './App.css';
import ToDoForm from './components/TodoForm';
import ToDoList from './components/ToDoList';
import {useState} from 'react';
function App() {
  const [todos, setTodos] = useState([]);

  const handleAddToDo = (text) =>{
    const newTodo = {
      id:Date.now(),
      text:text,
      completed:false
    };
    setTodos([...todos,newTodo]);
  }
  return (
    <div className="App">
     <h1>Todo App</h1>
      <ToDoForm onAdd = {handleAddToDo} />
      <ToDoList todos = {todos} />
    </div>
  );
}

export default App;
