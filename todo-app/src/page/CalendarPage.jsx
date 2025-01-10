import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';
import TodoSidebar from '../components/TodoSidebar';
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
      <TodoSidebar todos={todos} />
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