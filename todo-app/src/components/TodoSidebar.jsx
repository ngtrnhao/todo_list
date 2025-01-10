import React from 'react';

function TodoSidebar({todos}) {
    const totalTasks = todos.length;

    //Phân loại công việc dựa trên trạng thái 
    const normalTask = todos.filter(todo => !todo.completed).length;
    const makeupTask = todos.filter(todo => todo.priority === 'makeup').length;
    const substituteTask = todos.filter(todo => todo.priority === 'substitute').length; 

    const workloadPercentage = totalTasks > 0 
    ? Math.round((todos.filter(todo => !todo.completed).length/totalTasks)*100)
    :0 ;
    return (
        <div className= "todo-sidebar">
            <div className="task-summary">
                <h3>Tổng quan công việc</h3>
                <div className="stats-circle">
                    <span>{totalTasks}</span>
                    <p>Công việc</p>
                </div>
            </div>
            <div classname ="task-types">
                <div className="task-type">
                    <span className= "dot normal"></span>
                    <span>{normalTasks} Công việc chính </span>
                </div>
                <div className="task-type">
                    <span className= "dot makeup"></span>
                    <span>{makeupTasks} Công việc phụ </span>
                </div>
                <div className= "task-type">
                    <span className= "dot substitute"></span>
                    <span>{substituteTasks}Công việc thay thế</span>
                </div>
            </div>
            <div className = "work-load">
                <h4>Khối lượng công việc</h4>
                {workloadPercentage>80 && (
                    <span className="warning">Cần chú ý</span>
                )}
                <div className="progress-bar">
                    <div className ="progress" 
                    style={{width: `${workloadPercentage}%`}}
                    ></div>
                </div>
                <span>{workloadPercentage}%</span>
            </div>
        </div>
    );
}
export default TodoSidebar;