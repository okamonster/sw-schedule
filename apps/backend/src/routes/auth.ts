import type { User } from '@prisma/client';
import { Hono } from 'hono';
import { jwt, sign } from 'hono/jwt';
import { RATE_LIMIT_LIMIT, RATE_LIMIT_WINDOW_MS } from '~/constants/index.js';
import {
  createUserRequestSchema,
  getUserByEmailAndPasswordRequestSchema,
  signInByGoogleRequestSchema,
} from '~/entities/user.js';
import {
  varificateTokenRequestSchema,
  verifyTokenRequestSchema,
} from '~/entities/varifycationToken.js';
import {
  createGoogleUserOperation,
  createUserOperation,
  deleteUserByTransactionOperation,
  getUserByEmailAndPasswordOperation,
  getUserByEmailOperation,
} from '~/infrastructures/userOperations.js';
import {
  createVarificationTokenOperation,
  verifyTokenOperation,
} from '~/infrastructures/varificationTokenOperations.js';
import { verifyGoogleToken } from '~/libs/oAuth.js';
import { sendVerificationEmail } from '~/libs/resend.js';
import { checkRateLimit } from '~/utils/auth.js';

const app = new Hono();

// JWTシークレットキー（環境変数から取得することを推奨）
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.post('/login', async (c) => {
  const clientIP = c.req.header('x-forwarded-for') || 'unknown';

  if (!checkRateLimit(`login:${clientIP}`, RATE_LIMIT_LIMIT.LOGIN, RATE_LIMIT_WINDOW_MS.LOGIN)) {
    return c.json({ error: 'Too many login attempts. Please try again later.' }, 429);
  }

  const body = await c.req.json();
  const result = getUserByEmailAndPasswordRequestSchema.safeParse(body);
  try {
    if (!result.success) {
      return c.json({ error: 'Invalid request format' }, 400);
    }
    const { email, password } = result.data;

    const user = await getUserByEmailAndPasswordOperation(email, password);

    if (!user) {
      return c.json({ error: 'Invalid credentials' }, 401);
    }

    // JWTトークンを生成
    const token = await sign({ userId: user.id, email: user.email }, JWT_SECRET);

    return c.json(
      {
        userId: user.id,
        token,
      },
      200
    );
  } catch (e) {
    console.error(e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.post('/signup', async (c) => {
  const clientIP = c.req.header('x-forwarded-for') || 'unknown';

  if (!checkRateLimit(`signup:${clientIP}`, RATE_LIMIT_LIMIT.SIGNUP, RATE_LIMIT_WINDOW_MS.LOGIN)) {
    return c.json({ error: 'Too many signup attempts. Please try again later.' }, 429);
  }

  const body = await c.req.json();
  const result = createUserRequestSchema.safeParse(body);

  try {
    if (!result.success) {
      return c.json({ error: 'Invalid request body' }, 400);
    }

    const { email, password } = result.data;

    // 既存ユーザーの確認
    const existingUser = await getUserByEmailOperation(email);
    if (existingUser) {
      return c.json({ error: 'User already exists' }, 409);
    }

    await createUserOperation(email, password);

    return c.json({ message: 'Signup successful' }, 201);
  } catch (e) {
    console.error(e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.post('/google', async (c) => {
  const clientIP = c.req.header('x-forwarded-for') || 'unknown';

  if (!checkRateLimit(`google:${clientIP}`, RATE_LIMIT_LIMIT.GOOGLE, RATE_LIMIT_WINDOW_MS.LOGIN)) {
    return c.json({ error: 'Too many Google login attempts. Please try again later.' }, 429);
  }

  const body = await c.req.json();

  const result = signInByGoogleRequestSchema.safeParse(body);

  try {
    if (!result.success) {
      return c.json({ error: 'Invalid request body' }, 400);
    }

    const { email, googleToken } = result.data;

    const isValidToken = await verifyGoogleToken(googleToken);

    if (!isValidToken) {
      return c.json({ error: 'Invalid Google token' }, 401);
    }
    let user: User | null = null;

    user = await getUserByEmailOperation(email);

    if (!user) {
      user = await createGoogleUserOperation(email);
    }

    // JWTトークンを生成
    const token = await sign({ userId: user.id, email: user.email }, JWT_SECRET);

    return c.json(
      {
        userId: user.id,
        token,
      },
      200
    );
  } catch (e) {
    console.error('Google auth error:', e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.delete('/withdraw', jwt({ secret: process.env.JWT_SECRET || '' }), async (c) => {
  const jwtPayload = c.get('jwtPayload');

  if (!jwtPayload) {
    return c.json({ error: 'Unauthorized' }, 403);
  }

  const clientIP = c.req.header('x-forwarded-for') || 'unknown';

  if (!checkRateLimit(`withdraw:${clientIP}`, RATE_LIMIT_LIMIT.LOGIN, RATE_LIMIT_WINDOW_MS.LOGIN)) {
    return c.json({ error: 'Too many withdrawal attempts. Please try again later.' }, 429);
  }

  const { userId } = jwtPayload;

  try {
    await deleteUserByTransactionOperation(userId);

    return c.json({ message: 'Withdrawal successful' }, 200);
  } catch (e) {
    console.error(e);
  }
});

app.post('/varificate-token', async (c) => {
  const body = await c.req.json();
  const result = varificateTokenRequestSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid request body' }, 400);
  }

  const { email } = result.data;
  try {
    const token = await createVarificationTokenOperation(email);
    await sendVerificationEmail(email, token);

    return c.json({ token }, 200);
  } catch (e) {
    console.error(e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

app.post('/varification-token/verify', async (c) => {
  const body = await c.req.json();
  const result = verifyTokenRequestSchema.safeParse(body);

  if (!result.success) {
    return c.json({ error: 'Invalid request body' }, 400);
  }

  const { email, token } = result.data;
  try {
    const verificationToken = await verifyTokenOperation(email, token);

    if (!verificationToken) {
      return c.json({ error: 'Invalid token' }, 401);
    }

    return c.json({ message: 'Token verified' }, 200);
  } catch (e) {
    console.error(e);
    return c.json({ error: 'Internal server error' }, 500);
  }
});

export default app;
