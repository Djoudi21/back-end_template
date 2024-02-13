import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { getTokenFromHeaders } from '../utils'

const isTestingEnvironment = process.env.NODE_ENV === 'test';
const secretKey:  Secret | undefined = isTestingEnvironment ? 'testing_secret': ( process.env.JWT_SECRET as Secret | undefined);



export const verifyAccessToken = (request: any, reply: any, done: any) => {
 const accessToken = getTokenFromHeaders(request)
  if (!accessToken) {
    reply.code(401).send({ error: 'Access token not provided' });
    return;
  }

  if (!secretKey) {
    return;
  }

  try {
    jwt.verify(accessToken, secretKey) as JwtPayload;
    done()
  } catch (err) {
    reply.code(403).send({ error: err });
  }
};
