export const staffNavList = [
  {
    path: '/',
    name: 'Home',
    matchingRoutes: ['/'],
  },
];

export const anonymousNavList = [
  {
    path: '/login',
    name: 'Login',
    matchingRoutes: ['/login'],
  },
];

export const adminNavList = [
  {
    path: '/',
    name: 'Home',
    matchingRoutes: ['/'],
  },
  {
    path: '/users',
    name: 'Manage User',
    matchingRoutes: ['/users', '/users/create', 'users/edit'],
  },
  {
    path: '/assets',
    name: 'Manage Asset',
    matchingRoutes: ['/assets', '/assets/create', 'assets/edit'],
  },
  {
    path: '/assignments',
    name: 'Manage Assignment',
    matchingRoutes: ['/assignments', '/assignments/create', 'assignments/edit'],
  },
  {
    path: '/requests',
    name: 'Request for Returning',
    matchingRoutes: ['/requests'],
  },
  {
    path: '/report',
    name: 'Report',
    matchingRoutes: ['/report'],
  },
];
