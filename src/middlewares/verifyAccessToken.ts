import jwt, { Secret } from 'jsonwebtoken'
import { getTokenFromHeaders } from '../utils'

const isTestingEnvironment = process.env.NODE_ENV === 'test';
const secretKey:  Secret | undefined = isTestingEnvironment ? 'testing_secret':  process.env.JWT_SECRET;



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
    // Verify the access token and attach the decoded user to the request object
    request.user = jwt.verify(accessToken, secretKey);
    done()
  } catch (err) {
    reply.code(403).send({ error: 'Invalid access token' });
    return;
  }
};
