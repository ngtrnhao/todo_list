import React,{useState} from 'react';

function TodoList({todos, onToggle,onDelete,onEdit}) {
    const [editText,setEditText] = useState('');
    const[editingId,setEditingId] = useState(null);

    const handleEditClick = (todo) =>{
        setEditingId(todo.id);
        setEditText(todo.text);
    }

    const handleSave = (id) =>{
        onEdit(id,editText);
        setEditingId(null);
    }
    return (
        <div className = "todo-list">
            {todos.map(todo =>(
                <div key ={todo.id} className="todo-item">
                    {editingId === todo.id?(
                        //Hiển thị form edit
                        <div className="edit-form">
                            <input 
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            />
                            <button onClick ={() => handleSave(todo.id)}>Lưu </button>
                            <button onClick ={() => setEditingId(null)}>Hủy </button>
                        </div>
                    ) :(
                        <>
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
                            <button onClick={()=> handleEditClick(todo)}>Sửa</button>
                            <button onClick={()=> onDelete(todo.id)}>Xóa</button>
                        </>
                    )}
                  
                </div>
            ))}
        </div>
    )
}
export default TodoList;