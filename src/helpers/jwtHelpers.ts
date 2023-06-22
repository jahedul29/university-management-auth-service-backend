import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = async (
  payload: Record<string, unknown>,
  secret: Secret,
  expiresIn: string
): Promise<string> => {
  const token = await jwt.sign(payload, secret, { expiresIn: expiresIn });
  return token;
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  const verifiedData = jwt.verify(token, secret) as JwtPayload;
  return verifiedData;
};

export const JwtHelpers = {
  createToken,
  verifyToken,
};
