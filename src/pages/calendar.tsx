"use client";

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import tippy from 'tippy.js';
import '../pages/css/calendar.css';
import baseUrl from '@/config/baseUrl';
import { CalendarEvent, ClassItem } from '@/interfaces/interaces';



export default function Calendar() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [events, setEvents] = useState<CalendarEvent[]>([]);


  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch(`${baseUrl}/classes`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        }
        );
        if (response.ok) {
          const data: ClassItem[] = await response.json();
          setClasses(data);
        } else {
          console.error('Failed to fetch classes');
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleLoadCalendar = async () => {
    console.log('Selected class:', selectedClass);
    if (!selectedClass) {
      alert('Veuillez sélectionner une classe.');
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/sessions-subjects/class/${selectedClass}` , {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      }
      );
      console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        interface EventData {
          id: number;
          assignment_info: {
            subject_info: {
              name: string;
            };
          };
          start_at: string;
          end_at: string;
        }

        const formattedEvents = data.map((event: EventData) => ({
          id: event.id.toString(),
          title: event.assignment_info.subject_info.name,
          start: event.start_at,
          end: event.end_at,
          color: '#1e90ff',
          textColor: '#ffffff',
        }));
        setEvents(formattedEvents);
      } else {
        console.error('Failed to load calendar events');
      }
    } catch (error) {
      console.error('Error loading calendar events:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-6xl p-4 bg-white rounded-lg ml-64">
        <div className="flex justify-between items-center mb-4">
          <select
            className="border border-gray-300 rounded-md p-2"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Sélectionnez une classe</option>
            {classes.map((classItem) => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.name}
              </option>
            ))}
          </select>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleLoadCalendar}
          >
            Charger le calendrier
          </button>
        </div>
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
          events={events}
          select={(info) => {
            console.log('Selected:', info.allDay, info.startStr, info.endStr);
          }}
          eventClick={(info) => {
            alert('Event: ' + info.event.title);
            info.el.style.borderColor = 'red';
          }}
          eventDidMount={(info) => {
            tippy(info.el, {
              content: `
                <strong>${info.event.title}</strong><br>
                Début: ${info.event.start ? info.event.start.toLocaleString() : 'N/A'}<br>
                Fin: ${info.event.end ? info.event.end.toLocaleString() : 'N/A'}
              `,
              allowHTML: true,
              placement: 'top',
              theme: 'light-border',
            });
          }}
        />
      </div>
    </div>
  );
}