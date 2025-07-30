export function isTokenValid(token) {
  const expectedToken = import.meta.env.VITE_AUTH_TOKEN
  return token === expectedToken
}
