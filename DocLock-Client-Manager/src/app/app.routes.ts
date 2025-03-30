import { Routes } from '@angular/router';
import { authGuard } from '../Guards/auth.guard';
import { LoginComponent } from '../Components/login/login.component';
import { ApplayoutComponent } from '../Components/applayout/applayout.component';
import { UsersListComponent } from '../Components/users-list/users-list.component';
import { DashboardComponent } from '../Components/dashboard/dashboard.component';
import { SendEmailComponent } from '../Components/send-email/send-email.component';
import { AboutComponent } from '../Components/about/about.component';

export const routes: Routes = [
    {
        path: '', component: ApplayoutComponent, canActivate: [authGuard], children: [
            {path:'',component:AboutComponent},
            {path:'dashboard',component:DashboardComponent},
            { path: 'users', component: UsersListComponent },
            { path: 'send-email/:userId', component: SendEmailComponent }        
            ]
    },
    {path:'login',component:LoginComponent},
];
