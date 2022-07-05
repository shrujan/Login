import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginServiceService, Users } from '../services/login-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  usersList:         Users[];
  filteredUsersList: Users[];
  userFilter:        string;
  subscription:      Subscription;

  constructor(
    private router: Router,
    private loginService: LoginServiceService
  ) { }

  ngOnInit(): void {
    this.loginService.getUser();
    this.subscription = this.loginService.usersSubjectMap$.subscribe(users => {
      if (users) {
        this.usersList         = users;
        this.filteredUsersList = users;
      }
    })
  }

  filterUsers() {
    console.log('filter', this.userFilter)
    const convertToLowerCase = (text) => text.toLowerCase()
    this.filteredUsersList = this.usersList.filter(user => convertToLowerCase(user.name).includes(convertToLowerCase(this.userFilter)))
  }

  showUserDetails() {
    this.router.navigate(['user']);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
