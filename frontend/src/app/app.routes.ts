import { Routes } from '@angular/router';
import { authGuard } from '@features/auth/guards/auth.guard';
import { guestGuard } from '@features/auth/guards/guest.guard';
import { Login } from '@features/auth/pages/login/login';
import { AuthLayout } from '@layout/auth/auth-layout/auth-layout';
import { Shell } from '@layout/shell/shell/shell';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },

  {
    path: 'login',
    component: AuthLayout,
    canActivate: [guestGuard],
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
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/pages/dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./features/customers/pages/customer-list/customer-list').then(
            (m) => m.CustomerList,
          ),
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/pages/product-list/product-list').then((m) => m.ProductList),
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'login',
  },
];
