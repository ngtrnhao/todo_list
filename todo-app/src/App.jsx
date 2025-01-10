import './App.css'
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Header from './components/Header';
import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import { Routes, Route, Link } from 'react-router-dom';
import TodoPage from './page/TodoPage';
import CalendarPage from './page/CalendarPage';

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
  const [view,setView] =useState('list');
  const [darkMode,setDarkMode] = useState(false);
  useEffect(()=>{
    const savedTheme = localStorage.getItem('theme');
    if(savedTheme === 'dark'){
      setDarkMode(true);
    }
  },[]);
  //function toggle theme 
  const toggleTheme =() =>{
    setDarkMode(!darkMode);
    localStorage.setItem('theme',!darkMode ? 'dark':'light');
  };
  
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
  const handleUpdateTodo = (id, updatedTodo) => {
    setTodos(todos.map(todo => 
        todo.id === id ? updatedTodo : todo
    ));
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
    <div className={`App ${darkMode ? 'dark' : 'light'}`}>
      <button onClick={toggleTheme} className="theme-toggle">
        {darkMode ? '🌞' : '🌙'}
      </button>
      <Header />
      <h1>Todo App</h1>
      
      <nav className="navigation">
        <Link to="/">Danh sách công việc</Link>
        <Link to="/calendar">Lịch</Link>
      </nav>

      <Routes>
        <Route path="/" element={
          <TodoPage 
            todos={todos}
            onAdd={handleAddTodo}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
            filter={filter}
            handleFilterChange={handleFilterChange}
            editingId={editingId}
            setEditingId={setEditingId}
          />
        } />
        <Route path="/calendar" element={
          <CalendarPage 
            todos={todos}
            onUpdateTodo={handleUpdateTodo}
          />
        } />
      </Routes>
    </div>
  );
}
export default App;