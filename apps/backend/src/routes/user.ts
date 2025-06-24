import { Hono } from 'hono';
import { getUserByIdOperation } from '~/infrastructures/userOperations.js';

const app = new Hono();

app.get('/user/:id', async (c) => {
  const userId = c.req.param('id');

  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ error: 'Unauthorized' }, 401);
  }

  const user = await getUserByIdOperation(userId);

  return c.json(user);
});

export default app;
