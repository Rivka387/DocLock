import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../Models/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Roles } from '../Models/roles';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = 'http://localhost:3000/api/User';
  private usersBehaviorSubject = new BehaviorSubject<User[]>([]);
  public users$: Observable<User[]> = this.usersBehaviorSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) { 
    this.getUsers();
  }

  // GET all users
  getUsers(): void {
    this.http.get<User[]>(this.apiUrl).subscribe(
      (users) => {
        this.usersBehaviorSubject.next(users);
      },
      (error) => alert('Error:' + error.message)
    );
  }

  // GET user by ID
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // GET user by email
  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/email?email=${email}`);
  }

  //PUT enabel user
  enableUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/enable/${id}`,null).pipe(tap(() => this.getUsers()));
  }

  //PUT disabel user
  disableUser(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/disable/${id}`,null).pipe(tap(() => this.getUsers()));
  }

  // PUT update user name by ID
  updateUserName(id: number, name: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/name`, name).pipe(tap(() => this.getUsers()));
  }

  // PUT update user password by ID
  updateUserPassword(id: number, password: string): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}/password`, password);
  }

  // DELETE user by ID
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(tap(() => this.getUsers()));
  }
}