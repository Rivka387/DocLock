import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-applayout',
  standalone: true,
  imports: [RouterLink,RouterOutlet,MatToolbarModule,MatIconModule,MatButtonModule,MatListModule,MatChipsModule],
  templateUrl: './applayout.component.html',
  styleUrl: './applayout.component.css'
})
export class ApplayoutComponent {
  router=inject(Router);
  constructor(private authService: AuthService) { }
    logout() {
  this.authService.isAuth=false
  this.authService.logout();
  console.log("User logged out");
  this.router.navigate(["/login"]);
    }
}
