import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import artist from './routes/artist.js';
import auth from './routes/auth.js';
import user from './routes/user.js';

const app = new Hono();

app.use('*', cors());
app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.route('/auth', auth);
app.route('/user', user);
app.route('/artist', artist);

serve({
  fetch: app.fetch,
  port: 8787,
});
