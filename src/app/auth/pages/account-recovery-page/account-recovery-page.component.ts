import { AuthServiceService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from './../../../radio/services/firebase.service';
import { User } from '../../../shared/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-recovery-page',
  templateUrl: './account-recovery-page.component.html',
  styleUrl: './account-recovery-page.component.css'
})
export class AccountRecoveryPageComponent {
  users: User[] = [];
  user: User = {
    uid: '',
    id: '',
    names: '',
    email: '',
    password: '',
    isAdmin: false,
  }

  constructor(
    private firestore: FirestoreService,
    private auth: AuthServiceService,
    private router: Router){
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.firestore.getCollection<User>('user').subscribe( res => {
      this.users = res;
    });
  }

  recoverPassword(){
    this.auth.recoverPassword(this.user.email);
  }
}
