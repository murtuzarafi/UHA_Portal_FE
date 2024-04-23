import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, isEmpty } from 'rxjs';
import { User } from './User'
import { Userservice } from '../services/userservice.service'

@Injectable()
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  user: any
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private userservice: Userservice
  ) { }

  login(user: string) {
    console.log('User ', user)
    if (user !== '') {
      this.userservice.GetUserEmail(user).subscribe((response) => {
        console.log("Respose!: ", response)
        this.user = user;
      }
      )
      this.loggedIn.next(true);
      this.router.navigate(['./enterpassword', { id: user }]);
      // this.router.navigate(['./enterpassword'], { queryParams: {id: user}, skipLocationChange: true});
      //this.router.navigate(['./enterpassword/{id: user}'], { skipLocationChange: true });
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

}