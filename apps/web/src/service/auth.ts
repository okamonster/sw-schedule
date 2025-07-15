export const createVarificationToken = async (email: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/varificate-token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  if (!response.ok || !data.token) {
    throw new Error('Failed to create varification token');
  }

  return data.token;
};

export const verifyToken = async (email: string, token: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/varification-token/verify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email.toLowerCase(),
        token,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok || !data) {
    throw new Error('Failed to verify token');
  }
};
