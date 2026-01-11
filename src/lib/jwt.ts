interface JwtPayload {
  exp: number;
}

export const decodeJwt = (token: string): JwtPayload | null => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJwt(token);

  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
};
