// by convention next js expect to exported function of middleware
// but next-auth already has one that checks if the user are logged in and so on
// so we're exporting here imported middleware just in on line
export { default } from 'next-auth/middleware';

// next js by convention expecting config variable
// where we can configure mather which is array of paths that gonna go through or middleware
export const config = {
  // *: zero or more
  // +: one or more
  // ?: zero on one
  matcher: ['/users', '/auth/change-password']
};