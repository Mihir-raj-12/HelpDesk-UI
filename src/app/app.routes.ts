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
      }


      // We will add the 'tickets' route right here in the next step!
    ]
  },

{
    path: '**',
    redirectTo: 'login'
  }

];
