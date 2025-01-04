import './App.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/ToDoList';
import Header from './components/Header'
import { useState, useEffect } from 'react';

function App() {
  const [todos,setTodos] = useState (()=>{
    try{
      //Lấy dữ liệu từ localStorage
      const localData = localStorage.getItem('todos');
      //Nếu có dữ liệu thì parse JSON, không thì trả về mảng rổng
      return localData ? JSON.parse(localData) : [];
    } catch(err) {
      console.error('Error reading from localStorage',err);
      return [];
    }
  });
  useEffect(()=>{
    try{
      localStorage.setItem('todos',JSON.stringify(todos));
    }catch (err){
      console.error('Error saving to localStorage',err);
    }
  },[todos]);
  const [filter,setFilter] = useState(`all`);
  const [editingId,setEditingId] = useState(null);
  const handleAddTodo = (text,deadline) =>{
    const newTodo = {
      id:Date.now(),
      text:text,
      completed:false,
      deadline:deadline,
      priority:'normal'
    };
    setTodos([...todos,newTodo]);
  };
  const handleEdit = (id, newText) => {
    // Kiểm tra input
    if (!newText.trim()) {
      return;
    }
    
    // Cập nhật todo
    setTodos(todos.map(todo => 
      todo.id === id 
        ? {...todo, text: newText} 
        : todo
    ));
    
    // Reset trạng thái edit
    setEditingId(null);
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
      <Header></Header>
      <h1>Todo App</h1>
      <div className="todo-stats">
        <p>Tổng số công việc: {todos.length}</p>
        <p>Đã hoàn thành: {todos.filter(todo => todo.completed).length}</p>
        <p>Chưa hoàn thành:{todos.filter(todo => !todo.completed).length}</p>
      </div>
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
      onEdit={handleEdit}
      editingId={editingId}
      setEditingId={setEditingId}
      />
    </div>
  );
}
export default App;