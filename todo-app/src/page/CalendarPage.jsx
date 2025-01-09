import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';

function CalendarPage({ todos, onUpdateTodo }) {
  const events = todos.map(todo => ({
    id: todo.id,
    title: todo.text,
    start: todo.deadline,
    backgroundColor: todo.completed ? '#4CAF50' : '#2196F3',
    borderColor: todo.completed ? '#4CAF50' : '#2196F3',
  }));

  const handleEventDrop = (info) => {
    const { event } = info;
    const updatedTodo = todos.find(todo => todo.id === parseInt(event.id));
    if (updatedTodo) {
      onUpdateTodo(parseInt(event.id), {
        ...updatedTodo,
        deadline: event.start
      });
    }
  };

  const upcomingTasks = todos
    .filter(todo => !todo.completed && new Date(todo.deadline) > new Date())
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5);

  return (
    <div className="calendar-page">
      <div className="calendar-sidebar">
        <div className="sidebar-section">
          <h3>Thống kê</h3>
          <div className="stats-circle">
            <span>{todos.length}</span>
            <p>Tổng số</p>
          </div>
          <div className="stats-details">
            <p>Đã hoàn thành: {todos.filter(t => t.completed).length}</p>
            <p>Chưa hoàn thành: {todos.filter(t => !t.completed).length}</p>
          </div>
        </div>

        <div className="sidebar-section">
          <h3>Công việc sắp tới</h3>
          <div className="upcoming-tasks">
            {upcomingTasks.map(todo => (
              <div key={todo.id} className="upcoming-task-item">
                <span className="task-title">{todo.text}</span>
                <span className="task-deadline">
                  {new Date(todo.deadline).toLocaleDateString('vi-VN')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="calendar-main">
        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridWeek,timeGridDay'
          }}
          locale={viLocale}
          firstDay={1}
          slotMinTime="07:00:00"
          slotMaxTime="20:00:00"
          allDaySlot={false}
          height="auto"
          editable={true}
          droppable={true}
          events={events}
          eventDrop={handleEventDrop}
        />
      </div>
    </div>
  );
}

export default CalendarPage;