import React, {useState} from 'react';

function ToDoForm({onAdd}) {
    const [input, setInput] = useState('');
    const [deadline, setDeadline] = useState('');

    //Hàm xử lý submit
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(input.trim()){
            onAdd(input,deadline);
            setInput('');
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
            type = "text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Thêm công việc mới " 
            />
            <input 
            type ="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            />
           <button type = "submit">Thêm</button>
        </form>
    )
}
export default ToDoForm;