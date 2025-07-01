import { Hono } from 'hono';
import { EditEventRequestSchema, SearchEventRequestSchema } from '~/entities/event.js';
import {
  createEventOperation,
  getEventByIdOperation,
  getEventsBySearchQueryOperation,
} from '~/infrastructures/eventOperations.js';

export const app = new Hono();

app.post('/', async (c) => {
  const body = await c.req.json();
  const createEventRequest = EditEventRequestSchema.safeParse(body);
  try {
    if (!createEventRequest.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }

    const event = await createEventOperation(createEventRequest.data);
    if (!event) {
      return c.json({ error: 'Failed to create event' }, 400);
    }

    return c.json({ ...event }, 200);
  } catch (error) {
    console.error('Error creating event:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/search', async (c) => {
  const request = await c.req.query();
  const searchEventRequest = await SearchEventRequestSchema.safeParse(request);

  try {
    if (!searchEventRequest.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }

    const events = await getEventsBySearchQueryOperation({ ...searchEventRequest.data });

    return c.json(events, 200);
  } catch (error) {
    console.error('Error searching events:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/:id', async (c) => {
  const { id } = c.req.param();
  try {
    const event = await getEventByIdOperation(id);

    if (!event) {
      return c.json({ error: 'Event not found' }, 404);
    }

    return c.json({ ...event }, 200);
  } catch (error) {
    console.error('Error getting event by id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
