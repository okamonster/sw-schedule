import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import {
  createArtistRequestSchema,
  searchArtistRequestSchema,
  updateArtistRequestSchema,
} from '~/entities/artist.js';
import {
  createArtistOperation,
  getArtistByIdOperation,
  getArtistsByIdsOperation,
  getArtistsOperation,
  searchArtistsOperation,
  updateArtistOperation,
} from '~/infrastructures/artistOperations.js';
import {
  createUserArtistFollowOperation,
  deleteUserArtistFollowOperation,
  getUserArtistFollowByUserAndArtistIdOperation,
  getUserArtistFollowsByUserIdOperation,
} from '~/infrastructures/userArtistFollowOperations.js';

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

app.get('/following-artists', jwt({ secret: process.env.JWT_SECRET || '' }), async (c) => {
  const jwtPayload = c.get('jwtPayload');

  try {
    if (!jwtPayload) {
      return c.json({ error: 'Unauthorized' }, 403);
    }
    const { userId } = jwtPayload;

    const followingUserArtistFollows = await getUserArtistFollowsByUserIdOperation(userId);
    const followingArtistIds = followingUserArtistFollows.map((follow) => follow.artistId);
    const artists = await getArtistsByIdsOperation(followingArtistIds);

    if (!artists) {
      return c.json({ error: 'Artists not found' }, 404);
    }

    return c.json(artists, 200);
  } catch (error) {
    console.error('Error getting following user artist follows:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.put('/:id', jwt({ secret: process.env.JWT_SECRET || '' }), async (c) => {
  const jwtPayload = c.get('jwtPayload');
  if (!jwtPayload) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  const { id } = c.req.param();

  const body = await c.req.json();
  const result = updateArtistRequestSchema.safeParse(body);
  try {
    if (!result.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }

    const artist = await updateArtistOperation(id, result.data);
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

app.get('/search', async (c) => {
  const query = c.req.query();
  const result = searchArtistRequestSchema.safeParse(query);

  try {
    if (!result.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }

    const query = result.data;

    const artists = await searchArtistsOperation({ ...query });

    return c.json(artists, 200);
  } catch (error) {
    console.error('Error searching artists:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/:id', async (c) => {
  const { id } = c.req.param();
  try {
    const artist = await getArtistByIdOperation(id);
    if (!artist) {
      return c.json({ error: 'Artist not found' }, 404);
    }

    return c.json(artist, 200);
  } catch (error) {
    console.error('Error getting artist by id:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.get('/:id/follow', jwt({ secret: process.env.JWT_SECRET || '' }), async (c) => {
  const { id: artistId } = c.req.param();
  const jwtPayload = c.get('jwtPayload');
  if (!jwtPayload) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  try {
    const { userId } = jwtPayload;

    const userArtistFollow = await getUserArtistFollowByUserAndArtistIdOperation(userId, artistId);

    if (!userArtistFollow) {
      return c.json(null, 200);
    }

    return c.json(userArtistFollow, 200);
  } catch (error) {
    console.error('Error getting user artist follow:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.post('/:id/follow', jwt({ secret: process.env.JWT_SECRET || '' }), async (c) => {
  const { id: artistId } = c.req.param();
  const jwtPayload = c.get('jwtPayload');
  if (!jwtPayload) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  try {
    const { userId } = jwtPayload;

    const userArtistFollow = await createUserArtistFollowOperation(userId, artistId);

    return c.json(userArtistFollow, 201);
  } catch (error) {
    console.error('Error creating user artist follow:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.delete('/:id/follow', jwt({ secret: process.env.JWT_SECRET || '' }), async (c) => {
  const { id: artistId } = c.req.param();
  const jwtPayload = c.get('jwtPayload');
  if (!jwtPayload) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  try {
    const { userId } = jwtPayload;

    await deleteUserArtistFollowOperation(userId, artistId);

    return c.json({ message: 'User artist follow deleted' }, 201);
  } catch (error) {
    console.error('Error deleting user artist follow:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
