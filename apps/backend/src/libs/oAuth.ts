export const verifyGoogleToken = async (token: string): Promise<boolean> => {
  try {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);
    return response.ok;
  } catch (error) {
    console.error('Failed to verify Google token:', error);
    return false;
  }
};
