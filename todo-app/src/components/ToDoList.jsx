import React,{useState} from 'react';
import ConfirmDialog from './ConfirmDialog';
function TodoList({todos, onToggle,onDelete,onEdit, editingId, setEditingId}) {
    const [editText,setEditText] = useState('');

    const handleEditClick = (todo) =>{
        setEditingId(todo.id);
        setEditText(todo.text);
    }

    
    const [deleteConfirm,setDeleteConfirm] = useState({isOpen:false,todoId:null});
  

    const handleSave = (id) =>{
        onEdit(id,editText);
        setEditingId(null);
    }
    const handleDeleteClick = (id) =>{
        setDeleteConfirm({isOpen:true,todoId:id})
    };

    const handleConfirmDelete  = () =>{
        onDelete(deleteConfirm.todoId);
        setDeleteConfirm({isOpen:false,todoId:null})
    }
    const handleCancelDelete  = () =>{
        setDeleteConfirm({isOpen:false,todoId:null})
    }

    const formatDeadline = (deadline) => {
        if (!deadline) return '';
        const date = new Date(deadline);
        return date.toLocaleString('vi-VN');
    };

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
                            <div className="todo-content">
                                <span className={todo.completed ? 'completed' : ''}>
                                    {todo.text}
                                </span>
                                {todo.deadline && (
                                    <span className="deadline">
                                        Hạn chót: {formatDeadline(todo.deadline)}
                                    </span>
                                )}
                            </div>
                            <button onClick={()=> handleEditClick(todo)}>Sửa</button>
                            <button onClick={()=> handleDeleteClick(todo.id)}>Xóa</button>
                            <ConfirmDialog 
                             isOpen={deleteConfirm.isOpen}
                             message="Bạn có chắc chắn muốn xóa công việc này?"
                             onConfirm={handleConfirmDelete}
                             onCancel={handleCancelDelete}
                             />
                        </>
                    )}
                  
                </div>
            ))}
        </div>
    )
}
export default TodoList;