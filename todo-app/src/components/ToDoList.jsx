import React from 'react';

function TodoList({todos}) {
    return (
        <div className = "todo-list">
            {todos.map(todo =>(
                <div key ={todo.id} className="todo-item">
                    <span>{todo.text}</span>
                </div>
            ))}
        </div>
    )
}
export default TodoList;