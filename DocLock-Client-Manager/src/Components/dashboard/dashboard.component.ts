import { Component } from '@angular/core';
import { UsersListComponent } from '../users-list/users-list.component';
import { UserActivityGraphComponent } from '../user-activity-graph/user-activity-graph.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ UserActivityGraphComponent,
    
    MatCardModule,
    MatListModule,
    MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
