import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs';

export interface Users {
  avatar: string,
  createdAt: string,
  id: string,
  name: string,
}

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private usersSubject$ = new BehaviorSubject<Users[]>(null);
  usersSubjectMap$ = this.usersSubject$.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  login(userInfo): Observable<boolean> {
  //  return this.http.post('/login', {//params})
  return new Observable((observer) => observer.next(true));
  }

  getUser(): void {
    const userPath = 'https://6050d62f5346090017670974.mockapi.io/api/users';
    this.http.get<Users[]>(userPath).subscribe((userList) => {
      if (userList) {
        this.usersSubject$.next(userList)
      }
    })
  }

}
