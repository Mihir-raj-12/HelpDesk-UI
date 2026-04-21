import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, 
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDividerModule],
  templateUrl: './user-management.html',
  styleUrl: './user-management.scss',
})
export class UserManagement implements OnInit {
private userService = inject(UserService);

users: any[] = [];
roles: any[] = [];

isLoading = false;
errorMessage = '';
showCreateForm = false;
isSubmitting = false;

newUser = {
  fullName: '',
    email: '',
    password: '',
    role: 0    

};

ngOnInit(): void {
  this.loadUsers();
  this.loadRoles();
}

loadRoles(): void {
  this.userService.getRoles().subscribe({
    next: (response) => { 
      if (response.isSuccess) {
        this.roles = response.data || [];
      }
    },
    error: (error) => {
      console.error('Error fetching roles:', error);
    }
  });
}

loadUsers(): void {
  this.isLoading = true;
  this.userService.getAllUser().subscribe({
    next: (response) => {
      if (response.isSuccess) {
        this.users = response.data || [];
      } else {
        this.errorMessage = response.message || 'Failed to load users.';
      }
      this.isLoading = false;
    },
    error: (error) => {
      console.error('Error fetching users:', error);
      this.isLoading = false;
    }
  });
}

toggleCreateForm(): void {
  this.showCreateForm = !this.showCreateForm;
  this.errorMessage = '';
}

createNewUser(): void {
if (!this.newUser.fullName || !this.newUser.email || !this.newUser.password || this.newUser.role === 0) {
  this.errorMessage = 'Please fill in all fields.';
  return;
}

this.isSubmitting = true;
this.userService.createUser(this.newUser).subscribe({
  next: (response) => {
    if (response.isSuccess) {
      this.loadUsers();
      this.showCreateForm = false;
      this.newUser = { fullName: '', email: '', password: '', role: 0 };
    }
    else {
      alert('Error: ' + response.message);
    }
    this.isSubmitting = false;
  },
  error: (error) => {
    console.error('Error creating user:', error);
    this.isSubmitting = false;
  }
});
}

changeUserRole(userId: string, newRoleId: number): void {
  this.userService.updateUserRole(userId, newRoleId).subscribe({
    next: (response) => {
      if (response.isSuccess) {
       alert('User role updated successfully.');
        this.loadUsers();
      }
      else {
        alert('Error: ' + response.message);
      }
    },
    error: (error) => {
      console.error('Error updating user role:', error);
    }
  });

}

deactivate(userId: string): void {
    if(confirm("Are you sure you want to deactivate this user? They will no longer be able to log in.")) {
      this.userService.deactivateUser(userId).subscribe(res => {
        if (res.isSuccess) {
          this.loadUsers(); // Refresh the list
        } else {
          alert('Failed to deactivate user: ' + res.message);
        }
      });
    }
  }



}
