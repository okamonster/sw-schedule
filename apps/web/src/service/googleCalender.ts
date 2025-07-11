import type { GoogleCalendarEvent } from '@/entities/googleCalender';

export const getGoogleCalendarEvents = async (
  accessToken: string,
  timeMin: string,
  timeMax: string
) => {
  const res = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true&maxResults=2500`,
    {
      method: 'GET',
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );

  const data = await res.json();

  if (!res.ok || !data) {
    return [];
  }

  return data.items;
};

export const createGoogleCalendarEvent = async (
  accessToken: string,
  event: GoogleCalendarEvent
) => {
  const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(event),
  });

  const data = await res.json();

  if (!res.ok || !data) {
    throw new Error('Failed to create Google Calendar event');
  }

  return data;
};
