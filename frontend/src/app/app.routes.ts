import { Routes } from '@angular/router';
import { Login } from '@features/auth/pages/login/login';
import { Dashboard } from '@features/dashboard/pages/dashboard/dashboard';
import { AuthLayout } from '@layout/auth/auth-layout/auth-layout';
import { Shell } from '@layout/shell/shell/shell';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: Login,
      },
    ],
  },
  {
    path: '',
    component: Shell,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/pages/customer-list/customer-list').then(
            (m) => m.CustomerList,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
