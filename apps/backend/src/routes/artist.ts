import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import { createArtistRequestSchema } from '~/entities/artist.js';
import { createArtistOperation, getArtistsOperation } from '~/infrastructures/artistOperations.js';

const app = new Hono();

app.post('/', jwt({ secret: process.env.JWT_SECRET || '' }), async (c) => {
  const jwtPayload = c.get('jwtPayload');
  if (!jwtPayload) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  const body = await c.req.json();
  const result = createArtistRequestSchema.safeParse(body);
  try {
    if (!result.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }

    const artist = await createArtistOperation(result.data);
    return c.json(artist, 201);
  } catch (error) {
    console.error('Error creating artist:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/list', async (c) => {
  try {
    const artists = await getArtistsOperation();
    return c.json(artists, 200);
  } catch (error) {
    console.error('Error getting artists:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
