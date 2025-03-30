import { Component, inject } from '@angular/core';
import { User } from '../../Models/user';
import { UsersService } from '../../Services/users.service';
import { AuthService } from '../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TextareaModule } from 'primeng/textarea';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, TableModule, RouterLink, MatIconModule, DialogModule, ButtonModule,TextareaModule,FormsModule],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent {
  users!: User[];
  router = inject(Router);
  displayDialog: boolean = false;
  selectedUserId!: number;
  actionType!: string;
  message: string = '';

  constructor(private userService: UsersService, private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUsers();
    this.userService.users$.subscribe(users => {
      this.users = users;
      console.log(this.users);
    });
  }

  getAuthServiceRole(): string {
    return this.authService.role;
  }


  unblockUser(id: number) {
    this.userService.enableUser(id).subscribe({
      next: () => {
        alert('User enabled');
        this.userService.getUsers();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  blockUser(id: number) {
    this.userService.disableUser(id).subscribe({
      next: () => {
        alert('User blocked');
        this.userService.getUsers();
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  
  sendEmail(id:number): void {
    this.router.navigate(['/send-email', id]);
  }

  openConfirmationDialog(userId: number, action: 'block' | 'unblock') {
    this.selectedUserId = userId;
    this.actionType = action === 'block' ? 'block' : 'unblock';
    this.displayDialog = true;
  }

  confirmAction() {
    if (this.actionType === 'block') {
      this.userService.disableUser(this.selectedUserId).subscribe({
        next: () => {
          this.sendEmail(this.selectedUserId);
          this.userService.getUsers();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.userService.enableUser(this.selectedUserId).subscribe({
        next: () => {
          this.sendEmail(this.selectedUserId);
          this.userService.getUsers();
        },
        error: (err) => console.error(err),
      });
    }
    this.displayDialog = false;
  }

  
}

