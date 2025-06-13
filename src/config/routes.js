import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

export const routes = {
  home: {
    id: 'home',
    label: 'Weather',
    path: '/',
    icon: 'Cloud',
    component: Home
  }
};

export const routeArray = Object.values(routes);