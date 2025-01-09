import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import viLocale from '@fullcalendar/core/locales/vi';

function Calendar({ todos, onUpdateTodo }) {
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

    return (
        <div className="calendar-container">
            <div className="calendar-sidebar">
                <div className="calendar-stats">
                    <h3>Thống kê công việc</h3>
                    <div className="stats-circle">
                        <span>{todos.length}</span>
                        <p>Tổng số</p>
                    </div>
                    <div className="stats-details">
                        <p>Đã hoàn thành: {todos.filter(t => t.completed).length}</p>
                        <p>Chưa hoàn thành: {todos.filter(t => !t.completed).length}</p>
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
                    slotDuration="01:00:00"
                    slotLabelInterval="01:00"
                    height={600}
                    editable={true}
                    droppable={true}
                    events={events}
                    eventDrop={handleEventDrop}
                    eventDisplay="block"
                    dayHeaderFormat={{
                        weekday: 'short',
                        day: '2-digit',
                        month: 'numeric'
                    }}
                />
            </div>
        </div>
    );
}

export default Calendar; 