import { Routes } from '@angular/router';

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
      }


      
    ]
  },

{
    path: '**',
    redirectTo: 'login'
  }

];
