import { Component, inject, signal } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth';
import { CommonModule } from '@angular/common';

// Angular Material Imports
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('helpdesk-ui');

  authService = inject(AuthService);
  isAdmin = false ;

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }


}
