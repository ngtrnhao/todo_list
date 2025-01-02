import React from 'react';

function TodoList({todos, onToggle,onDelete}) {
    return (
        <div className = "todo-list">
            {todos.map(todo =>(
                <div key ={todo.id} className="todo-item">
                    <input
                    type= "checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)} 
                    disabled={todo.completed}
                    />
                    <span style={{
                        textDecoration: todo.completed ? 'line-through' :'none',
                    }}>
                        {todo.text}
                    </span>
                    <button onClick={()=> onDelete(todo.id)}>Xóa</button>
                </div>
            ))}
        </div>
    )
}
export default TodoList;