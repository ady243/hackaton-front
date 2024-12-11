"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';

export default function Calendar() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl p-4 bg-white rounded shadow-md">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek" 
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          locale={frLocale} 
          selectable={true}
          selectMirror={true}
          allDaySlot={false} 
          dayMaxEvents={false}
          events={[
            { title: 'cours 1', start: '2024-12-01T09:00:00', end: '2024-12-01T10:30:00', color: '#ff9f89', textColor: '#000000' },
            { title: 'cours 2', start: '2024-12-01T11:00:00', end: '2024-12-01T12:30:00', color: 'crimson', textColor: '#ffffff' },
            { title: 'cours 3', start: '2024-12-01T14:00:00', end: '2024-12-01T15:30:00', color: '#1e90ff', textColor: '#ffffff' },
            { title: 'cours 4', start: '2024-12-20T09:00:00', end: '2024-12-20T10:30:00', color: '#ff9f89', textColor: '#000000' },
            { title: 'cours 5', start: '2024-12-20T11:00:00', end: '2024-12-20T12:30:00', color: 'crimson', textColor: '#ffffff' },
            { title: 'cours 6', start: '2024-12-20T14:00:00', end: '2024-12-20T15:30:00', color: '#1e90ff', textColor: '#ffffff' }
          ]}
          select={(info) => {
            console.log('Selected:', info.allDay, info.startStr, info.endStr);
          }}
          eventClick={(info) => {
            alert('Event: ' + info.event.title);
            info.el.style.borderColor = 'red';
          }}
        />
      </div>
    </div>
  );
}