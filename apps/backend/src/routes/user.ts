import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import {
  createUserProfileRequestSchema,
  updateUserProfileRequestSchema,
} from '~/entities/profile.js';
import type { ResponseUserDto } from '~/entities/user.js';
import { getUserByIdOperation } from '~/infrastructures/userOperations.js';
import {
  createUserProfileOperation,
  updateUserProfileOperation,
} from '~/infrastructures/userProfileOperation.js';

const app = new Hono();

// 認証ミドルウェアを適用
app.use(
  '/*',
  jwt({
    secret: process.env.JWT_SECRET || '',
  })
);

app.get('/me', async (c) => {
  const jwtPayload = c.get('jwtPayload');
  try {
    const user = await getUserByIdOperation(jwtPayload.userId);

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    const userResponse: ResponseUserDto = {
      ...user,
    };

    return c.json(userResponse);
  } catch (error) {
    console.error('Error fetching user:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.post('/profile', async (c) => {
  const jwtPayload = c.get('jwtPayload');
  const body = await c.req.json();
  const result = createUserProfileRequestSchema.safeParse(body);

  if (!jwtPayload) {
    return c.json({ error: 'Unauthorized' }, 403);
  }
  const userId = jwtPayload.userId;

  try {
    if (!result.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }

    await createUserProfileOperation(userId, result.data);
    return c.json({ message: 'Profile created successfully' }, 201);
  } catch (error) {
    console.error('Error creating profile:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.put('/profile', async (c) => {
  const jwtPayload = c.get('jwtPayload');
  const body = await c.req.json();
  const result = updateUserProfileRequestSchema.safeParse(body);

  if (!jwtPayload) {
    return c.json({ error: 'Unauthorized' }, 403);
  }
  const userId = jwtPayload.userId;

  try {
    if (!result.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }

    await updateUserProfileOperation(userId, result.data);
    return c.json({ message: 'Profile created successfully' }, 201);
  } catch (error) {
    console.error('Error creating profile:', error);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
