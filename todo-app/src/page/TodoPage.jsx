import React from 'react';
import TodoForm from '../components/TodoForm';
import TodoList from '../components/TodoList';

function TodoPage({ 
  todos, 
  onAdd, 
  onToggle, 
  onDelete, 
  onEdit, 
  filter,
  handleFilterChange,
  editingId,
  setEditingId 
}) {
  const getFilteredTodos = () => {
    switch(filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }

  return (
    <div className="todo-page">
      <div className="todo-stats">
        <p>Tổng số công việc: {todos.length}</p>
        <p>Đã hoàn thành: {todos.filter(todo => todo.completed).length}</p>
        <p>Chưa hoàn thành: {todos.filter(todo => !todo.completed).length}</p>
      </div>
      <TodoForm onAdd={onAdd} />
      <div className="filter-buttons">
        <button 
          className={filter === 'all' ? 'active' : ''}
          onClick={() => handleFilterChange('all')}
        >
          Tất cả
        </button>
        <button 
          className={filter === 'active' ? 'active' : ''}
          onClick={() => handleFilterChange('active')}
        >
          Đang làm
        </button>
        <button 
          className={filter === 'completed' ? 'active' : ''}
          onClick={() => handleFilterChange('completed')}
        >
          Đã xong
        </button>
      </div>
      <TodoList
        todos={getFilteredTodos()}
        onToggle={onToggle}
        onDelete={onDelete}
        onEdit={onEdit}
        editingId={editingId}
        setEditingId={setEditingId}
      />
    </div>
  );
}

export default TodoPage;