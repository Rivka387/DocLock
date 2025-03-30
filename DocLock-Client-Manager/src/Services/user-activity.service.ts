import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserActivityService {


  private apiUrl = 'http://localhost:3000/api/UserActivity'; // שים כאן את ה-URL של ה-API שלך

  constructor(private http: HttpClient) {}

  // שאילתה לשימוש שנתי של כל המשתמשים
  getYearlyUsage(year: number): Observable<{ [key: number]: number }> {
    const params = new HttpParams().set('year', year.toString());
    return this.http.get<{ [key: number]: number }>(`${this.apiUrl}/yearly-usage`, { params });
  }

  // שאילתה לשימוש חודשי של כל המשתמשים
  getMonthlyUsage(year: number, month: number): Observable<{ [key: number]: number }> {
    const params = new HttpParams()
      .set('year', year.toString())
      .set('month', month.toString()); // הוספת החודש כפרמטר חובה

    return this.http.get<{ [key: number]: number }>(`${this.apiUrl}/monthly-usage`, { params });
  }
}
