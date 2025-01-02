import './App.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/ToDoList';
import { useState } from 'react';

function App() {
  const [todos,setTodos] = useState ([]);
  const [filter,setFilter] = useState(`all`);

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
  
  const handleFilterChange = (filterType) =>{
    setFilter(filterType)
  }
  const getFilteredTodos = ()  =>{
    switch(filter) {
      case 'active':
        return todos.filter(todo =>!todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }
  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm onAdd = {handleAddTodo}/>
      <div className="filter-buttons">
        <button 
        className ={filter === 'all' ? 'active' : ``}
        onClick = {() => handleFilterChange('all')}
        >
          Tất cả
        </button>
        <button 
        className ={filter === 'active' ? 'active' : ``}
        onClick = {() => handleFilterChange('active')}
        >Đang làm 
        </button>
        <button 
        className = {filter === 'completed' ? 'active' : ``}
        onClick ={() =>handleFilterChange('completed') }
        >
          Đã xong
        </button>
      </div>
      <TodoList 
      todos = {getFilteredTodos()}
      onToggle={handleToggle}
      onDelete={handleDelete}
      />
    </div>
  );
}
export default App;