import './App.css';
import ToDoForm from './components/TodoForm';
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
      <div>
        {todos.map(todo => (
          <div key = {todo.id}>{todo.text}</div>
        ))}
      </div>
    </div>
  );
}

export default App;
