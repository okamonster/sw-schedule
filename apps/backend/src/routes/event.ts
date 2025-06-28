import { Hono } from 'hono';
import { SearchEventRequestSchema } from '~/entities/event.js';
import { getEventsBySearchQueryOperation } from '~/infrastructures/eventOperations.js';

export const app = new Hono();

app.get('/search', async (c) => {
  const request = await c.req.query();
  const searchEventRequest = SearchEventRequestSchema.safeParse(request);
  try {
    if (!searchEventRequest.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }

    const events = await getEventsBySearchQueryOperation(searchEventRequest.data);

    return c.json({ events }, 200);
  } catch (error) {
    console.error('Error searching events:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
