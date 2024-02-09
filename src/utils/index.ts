export const getTokenFromHeaders = (request: { headers: { [x: string]: any; }; }) => {
  const authHeader = request.headers['authorization'];
  return authHeader && authHeader.split(' ')[1]
}
