import type { Event } from '@/entities/event';
import type { GoogleCalendarEvent } from '@/entities/googleCalender';
import dayjs from '@/libs/dayjs';

export const convertEventToGoogleCalendar = (event: Event): GoogleCalendarEvent => {
  // startDateTime/endDateTimeがなければeventDateの9:00-11:00をデフォルト
  const startDateTime = dayjs(event.openDateTime).format('YYYY-MM-DDTHH:mm:ss');

  // endDateTimeはstartDateTimeの+3時間で強制
  const endDateTime = dayjs(startDateTime).add(3, 'hour').format('YYYY-MM-DDTHH:mm:ss');

  return {
    summary: event.eventName,
    description: event.eventDescription,
    location:
      event.eventLocationName && event.eventLocationAddress
        ? `${event.eventLocationName}, ${event.eventLocationAddress}`
        : event.eventLocationName || event.eventLocationAddress,
    start: {
      dateTime: startDateTime,
      timeZone: 'Asia/Tokyo',
    },
    end: {
      dateTime: endDateTime,
      timeZone: 'Asia/Tokyo',
    },
    reminders: {
      useDefault: true,
    },
  };
};
