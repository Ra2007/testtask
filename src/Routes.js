import React from 'react';
import AllPage from './pages/AllPage';
import ActivePage from './pages/ActivePage';
import DeletedPage from './pages/DeletedPage';
import NotFound from './pages/NotFound';
import WrapPages from './layouts/WrapPages';
import { Redirect } from 'react-router-dom';

export default [
  {
    component: WrapPages,
    routes: [
      {
        component: () => <Redirect to='/all' />,
        path: '/',
        exact: true
      },
      {
        component: AllPage,
        path: '/all'
      },
      {
        component: ActivePage,
        path: '/active'
      },
      {
        component: DeletedPage,
        path: '/deleted'
      },
      {
        component: NotFound
      }
    ]
  }
];
