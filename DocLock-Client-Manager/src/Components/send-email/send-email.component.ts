import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../Models/user';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../../Services/users.service';
import { CommonModule } from '@angular/common';
import { EmailService } from '../../Services/email.service';
import { EmailRequest } from '../../Models/EmailRequest';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css'
})
export class SendEmailComponent implements OnInit {
  router = inject(Router);

  userId!: number;
  user$!: Observable<User>;
  emailForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private usersService: UsersService,
    private emailService: EmailService,
    private snackBar: MatSnackBar
  ) {
    this.emailForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(3)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.userId = parseInt(this.route.snapshot.paramMap.get('userId') ?? '', 10);
    this.user$ = this.usersService.getUser(this.userId);
  }

  sendEmail(): void {
    if (this.emailForm.valid) {
      this.user$.subscribe((user) => {
        const emailRequest: EmailRequest = {
          to: user.email,
          subject: this.emailForm.value.subject,
          body: this.emailForm.value.body,
        };

        this.emailService.sendEmail(emailRequest).subscribe({
          next: () => {
            this.emailForm.reset();
            this.snackBar.open('Email sent successfully', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
            this.router.navigate(['/users']);
          },
          error: (error) => {
            this.snackBar.open('Error: ' + error.message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
          }
        });
      });
    }
  }
}
