import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { partOfUser } from '../../Models/user';
import { AuthService } from '../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Roles } from '../../Models/roles';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatCardModule,MatFormFieldModule,MatButtonModule,MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  router = inject(Router);
  logInForm!: FormGroup;
  email: string = '';
  password: string = '';
  user:partOfUser={};
  @Output() formClose = new EventEmitter<void>();
  @Input() showForm = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit():void {
    this.logInForm = this.fb.group({
      email: ['',Validators.email],
      password: ['',Validators.required]
    });
  }
    
  onSubmit():void {
    if(this.logInForm?.valid)
    {
      this.user=this.logInForm.value;
      this.user.roles=[Roles.Admin];
      if(this.user)
      {
        this.authService.login(this.user).subscribe({
          next: (res) => {            
            this.authService.saveToken(res.token,res.user);
            this.authService.isAuth=true;
            this.authService.role=res.role;
            this.authService.userId = res.userId;
            this.authService.token=res.token;
            this.snackBar.open('Login successful!', 'Close', { duration: 3000, panelClass: ['success-snackbar'] });
            this.router.navigate(['/']);
          },
          error: (err) => {
          this.snackBar.open('Error: ' + err.message, 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
        }
        });
        this.logInForm?.reset();
        this.formClose.emit();
      }
    }   
  }
}
