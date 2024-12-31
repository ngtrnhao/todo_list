import React, {useState} from 'react';

function ToDoForm({onAdd}) {
    const [input, setInput] = useState('');

    //Hàm xử lý submit
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(input.trim()){
            onAdd(input);
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
           <button type = "submit">Thêm</button>
        </form>
    )
}
export default ToDoForm;