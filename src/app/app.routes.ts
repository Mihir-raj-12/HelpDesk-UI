import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [

{
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
},
{
    // The main wrapper route
    path: '', 
    loadComponent: () => import('./core/layout/main-layout/main-layout').then(m => m.MainLayout),
    // Everything in this 'children' array will load INSIDE the layout's <router-outlet>
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { 
        path: 'dashboard', 
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.DashboardComponent) 
      },
      {
        path: 'tickets',
        loadComponent: () => import('./features/tickets/ticket-list/ticket-list').then(m => m.TicketList)
      },
      {
        path: 'tickets/new', 
        loadComponent: () => import('./features/tickets/ticket-create/ticket-create').then(m => m.TicketCreate)
      },
      {
        path: 'tickets/:id',
        loadComponent: () => import('./features/tickets/ticket-detail/ticket-detail').then(m => m.TicketDetail)
      },
      {
        path: 'admin/users',
        loadComponent: () => import('./features/admin/user-management/user-management').then(m => m.UserManagement),
        canActivate: [adminGuard] // <-- Protect this route with the admin guard
      },

      {
        path: 'admin/categories',
        loadComponent: () => import('./features/admin/category-management/category-management').then(m => m.CategoryManagement),
        canActivate: [adminGuard] // <-- Protect this route with the admin guard

      }
      


      
    ]
  },

{
    path: '**',
    redirectTo: 'login'
  }

];
