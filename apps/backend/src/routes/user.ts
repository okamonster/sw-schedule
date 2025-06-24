import { Hono } from 'hono';
import { jwt } from 'hono/jwt';
import type { ResponseUserDto } from '~/entities/user.js';
import { getUserByIdOperation } from '~/infrastructures/userOperations.js';

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

export default app;
