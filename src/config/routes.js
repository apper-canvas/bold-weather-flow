import HomePage from '@/components/pages/HomePage';
// NotFoundPage is directly imported by App.jsx for the "*" route, not managed in routeArray

export const routes = {
  home: {
    id: 'home',
    label: 'Weather',
    path: '/',
    icon: 'Cloud',
component: HomePage
  }
};

export const routeArray = Object.values(routes);