import { Routes } from '@angular/router';
import { Login } from '@features/auth/pages/login/login';
import { AuthLayout } from '@layout/auth/auth-layout/auth-layout';
import { Shell } from '@layout/shell/shell/shell';

export const routes: Routes = [
  {
    path: 'login',
    component: AuthLayout,
    children: [
      {
        path: '',
        component: Login
      }
    ]
  },
  {
    path: '',
    component: Shell,
    children: [
      // Dashboard, Clientes, etc.
    ]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
