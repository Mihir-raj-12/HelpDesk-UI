import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);


  if (authService.isAdmin()) {
    return true; // Let them in!
  } else {
    // Kick them back to the tickets page
    router.navigate(['/tickets']); 
    return false; 
  }
};
